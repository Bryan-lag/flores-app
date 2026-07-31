from typing import Optional
from sqlmodel import SQLModel, Field



class ProductoCreate(SQLModel):
    nombre: str = Field(
        min_length=3,
        max_length=100
    )

    descripcion: str = Field(
        min_length=10,
        max_length=500
    )

    precio: float = Field(
        gt=0
    )

    categoria: str = Field(
        min_length=3,
        max_length=50
    )

    imagen_url: str

    stock: int = Field(
        default=0,
        ge=0
    )


class ProductoRead(SQLModel):
    id: int
    nombre: str
    descripcion: str
    precio: float
    categoria: str
    imagen_url: str
    stock: int


class ProductoUpdate(SQLModel):
    nombre: Optional[str] = Field(
        default=None,
        min_length=3,
        max_length=100
    )
    descripcion: Optional[str] = Field(
        default=None,
        min_length=10,
        max_length=500
    )
    precio: Optional[float] = Field(
        default=None,
        gt=0
    )
    categoria: Optional[str] = Field(
        default=None,
        min_length=3,
        max_length=50
    )
    imagen_url: Optional[str] = Field(
        default=None
    )
    stock: Optional[int] = Field(
        default=None,
        ge=0
    )