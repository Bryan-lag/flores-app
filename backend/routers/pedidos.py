from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session

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

    total = 0
    detalles = []

    # Validar productos y calcular total
    for item in pedido.detalles:

        if item.cantidad <= 0:
            raise HTTPException(
                status_code=400,
                detail="La cantidad debe ser mayor que 0"
            )

        producto = session.get(
            Producto,
            item.producto_id
        )

        if not producto:
            raise HTTPException(
                status_code=404,
                detail=f"Producto {item.producto_id} no encontrado"
            )

        if item.cantidad > producto.stock:
            raise HTTPException(
                status_code=400,
                detail=f"No hay suficiente stock de {producto.nombre}"
            )

        subtotal = producto.precio * item.cantidad

        total += subtotal

        detalle = DetallePedido(
            producto_id=producto.id,
            cantidad=item.cantidad,
            precio_unitario=producto.precio
        )

        detalles.append(detalle)

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

    # Un único commit para todo el pedido
    session.commit()

    # Actualizar el objeto con los datos definitivos
    session.refresh(nuevo_pedido)

    return {
        "mensaje": "Pedido creado correctamente",
        "pedido_id": nuevo_pedido.id,
        "total": total
    }

