from typing import Optional
from sqlmodel import SQLModel


class ProductoCreate(SQLModel):
    nombre: str
    descripcion: str
    precio: float
    categoria: str
    imagen_url: str
    stock: int = 0


class ProductoRead(SQLModel):
    id: int
    nombre: str
    descripcion: str
    precio: float
    categoria: str
    imagen_url: str
    stock: int


class ProductoUpdate(SQLModel):
    nombre: Optional[str] = None
    descripcion: Optional[str] = None
    precio: Optional[float] = None
    categoria: Optional[str] = None
    imagen_url: Optional[str] = None
    stock: Optional[int] = None