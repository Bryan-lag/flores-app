from typing import Optional
from sqlmodel import SQLModel, Field


class DetallePedidoCreate(SQLModel):
    producto_id: int
    cantidad: int = Field(gt=0)


class PedidoCreate(SQLModel):
    nombre_cliente: str
    telefono: str
    direccion: str
    referencia: Optional[str] = None
    detalles: list[DetallePedidoCreate]