from typing import Optional
from sqlmodel import SQLModel


class DetallePedidoCreate(SQLModel):
     producto_id: int
     cantidad: int 
     
     
class PedidoCreate(SQLModel):
     nombre_cliente: str
     telefono: str
     direccion: str
     referencia: Optional[str] = None 
     detalles: list[DetallePedidoCreate]