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
    total = 0
    detalles = []

    for item in pedido.detalles:

        producto = session.get(
            Producto,
            item.producto_id
        )

        if not producto:
            raise HTTPException(
                status_code=404,
                detail=f"Producto {item.producto_id} no encontrado"
            )

        if item.cantidad <= 0:
            raise HTTPException(
                status_code=400,
                detail="La cantidad debe ser mayor que 0"
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

    nuevo_pedido = Pedido(
        nombre_cliente=pedido.nombre_cliente,
        telefono=pedido.telefono,
        direccion=pedido.direccion,
        referencia=pedido.referencia,
        total=total
    )

    session.add(nuevo_pedido)
    session.commit()
    session.refresh(nuevo_pedido)

    for detalle in detalles:
        detalle.pedido_id = nuevo_pedido.id

        session.add(detalle)

    session.commit()

    return {
        "mensaje": "Pedido creado correctamente",
        "pedido_id": nuevo_pedido.id,
        "total": total
    }