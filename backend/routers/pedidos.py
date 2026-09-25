from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from database import get_session
from models import Pedido, DetallePedido, Producto
from schemas.pedido import PedidoCreate


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