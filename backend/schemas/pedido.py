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
    
    
# --- Lectura para el panel de administrador ---

class DetallePedidoRead(SQLModel):
    producto_id: int
    producto_nombre: str
    cantidad: int
    precio_unitario: float


class PedidoRead(SQLModel):
    id: int
    nombre_cliente: str
    telefono: str
    direccion: str
    referencia: Optional[str] = None
    total: float
    estado: str
    detalles: list[DetallePedidoRead] = []


class EstadoUpdate(SQLModel):
    estado: str