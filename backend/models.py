from typing import Optional
from sqlmodel import SQLModel, Field


class Producto(SQLModel, table=True):
    id: Optional[int] = Field(
        default=None,
        primary_key=True
    )

    nombre: str
    descripcion: str
    precio: float
    categoria: str
    imagen_url: str
    stock: int = 0
    
    
class Pedido(SQLModel, table=True):
    id: Optional[int] = Field(
        default=None,
        primary_key=True
    )
    
    nombre_cliente: str
    telefono: str
    direccion: str
    referencia: Optional[str] = None
    total: float
    estado: str = "pendiente"
    
    
class DetallePedido(SQLModel, table=True):
    id: Optional[int] = Field(
        default=None,
        primary_key=True
    )

    pedido_id: int = Field(
        foreign_key="pedido.id"
    )

    producto_id: int = Field(
        foreign_key="producto.id"
    )

    cantidad: int
    precio_unitario: float