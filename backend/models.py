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