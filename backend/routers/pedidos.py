from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from auth import admin_requerido
from database import get_session
from models import Pedido, DetallePedido, Producto
from schemas.pedido import (
    PedidoCreate,
    PedidoRead,
    DetallePedidoRead,
    EstadoUpdate,
)


ESTADOS_VALIDOS = {
    "pendiente",
    "confirmado",
    "en_camino",
    "entregado",
    "cancelado",
}


router = APIRouter(
    prefix="/pedidos",
    tags=["pedidos"]
)


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED
)
def crear_pedido(
    pedido: PedidoCreate,
    session: Session = Depends(get_session)
):
    # Validar que el pedido tenga al menos un producto
    if not pedido.detalles:
        raise HTTPException(
            status_code=400,
            detail="El pedido debe contener al menos un producto"
        )

    # Si el mismo producto viene repetido, sumamos sus cantidades.
    # Así el control de stock se hace sobre el total real pedido.
    cantidades: dict[int, int] = {}

    for item in pedido.detalles:
        cantidades[item.producto_id] = (
            cantidades.get(item.producto_id, 0) + item.cantidad
        )

    total = 0
    detalles = []

    # Se recorren en orden de id para evitar bloqueos cruzados
    # cuando dos pedidos llegan al mismo tiempo.
    for producto_id in sorted(cantidades):
        cantidad = cantidades[producto_id]

        # with_for_update() bloquea la fila hasta terminar la transacción:
        # dos pedidos simultáneos no pueden comprar la misma última unidad.
        producto = session.exec(
            select(Producto)
            .where(Producto.id == producto_id)
            .with_for_update()
        ).first()

        if not producto:
            raise HTTPException(
                status_code=404,
                detail=f"Producto {producto_id} no encontrado"
            )

        if cantidad > producto.stock:
            raise HTTPException(
                status_code=400,
                detail=(
                    f"No hay suficiente stock de {producto.nombre} "
                    f"(disponible: {producto.stock})"
                )
            )

        # Descontar el stock
        producto.stock -= cantidad
        session.add(producto)

        total += producto.precio * cantidad

        detalles.append(
            DetallePedido(
                producto_id=producto.id,
                cantidad=cantidad,
                precio_unitario=producto.precio
            )
        )

    # Crear el pedido
    nuevo_pedido = Pedido(
        nombre_cliente=pedido.nombre_cliente,
        telefono=pedido.telefono,
        direccion=pedido.direccion,
        referencia=pedido.referencia,
        total=total
    )

    session.add(nuevo_pedido)

    # Flush obtiene el ID del pedido sin hacer commit todavía
    session.flush()

    # Agregar los detalles
    for detalle in detalles:
        detalle.pedido_id = nuevo_pedido.id
        session.add(detalle)

    # Un único commit: pedido, detalles y stock se guardan juntos.
    # Si algo falla antes de aquí, no se guarda nada.
    session.commit()

    session.refresh(nuevo_pedido)

    return {
        "mensaje": "Pedido creado correctamente",
        "pedido_id": nuevo_pedido.id,
        "total": total
    }
    
    
def _pedido_a_read(session: Session, pedido: Pedido) -> PedidoRead:
    """Arma un PedidoRead con el nombre de cada producto del detalle."""
    detalles = session.exec(
        select(DetallePedido).where(DetallePedido.pedido_id == pedido.id)
    ).all()

    items = []

    for detalle in detalles:
        producto = session.get(Producto, detalle.producto_id)

        items.append(
            DetallePedidoRead(
                producto_id=detalle.producto_id,
                producto_nombre=producto.nombre if producto else "Producto eliminado",
                cantidad=detalle.cantidad,
                precio_unitario=detalle.precio_unitario,
            )
        )

    return PedidoRead(
        id=pedido.id,
        nombre_cliente=pedido.nombre_cliente,
        telefono=pedido.telefono,
        direccion=pedido.direccion,
        referencia=pedido.referencia,
        total=pedido.total,
        estado=pedido.estado,
        detalles=items,
    )


@router.get("/", response_model=list[PedidoRead])
def listar_pedidos(
    session: Session = Depends(get_session),
    admin=Depends(admin_requerido),
):
    """
    Lista todos los pedidos, del más reciente al más antiguo, con su
    detalle de productos. Solo para administradores.
    """
    pedidos = session.exec(
        select(Pedido).order_by(Pedido.id.desc())
    ).all()

    return [_pedido_a_read(session, pedido) for pedido in pedidos]


@router.patch("/{pedido_id}/estado", response_model=PedidoRead)
def actualizar_estado_pedido(
    pedido_id: int,
    datos: EstadoUpdate,
    session: Session = Depends(get_session),
    admin=Depends(admin_requerido),
):
    """
    Cambia el estado de un pedido (pendiente, confirmado, en_camino,
    entregado o cancelado). Solo para administradores.
    """
    if datos.estado not in ESTADOS_VALIDOS:
        raise HTTPException(
            status_code=400,
            detail=f"Estado inválido. Debe ser uno de: {', '.join(sorted(ESTADOS_VALIDOS))}"
        )

    pedido = session.get(Pedido, pedido_id)

    if not pedido:
        raise HTTPException(status_code=404, detail="Pedido no encontrado")

    pedido.estado = datos.estado

    session.add(pedido)
    session.commit()
    session.refresh(pedido)

    return _pedido_a_read(session, pedido)