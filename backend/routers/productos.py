from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlmodel import Session, select

from database import get_session
from models import Producto
from schemas.producto import (
    ProductoCreate,
    ProductoRead,
    ProductoUpdate,
)


router = APIRouter(
    prefix="/productos",
    tags=["productos"]
)

def obtener_producto_o_404(
        producto_id: int,
        session: Session
    ):
        producto = session.get(
            Producto,
            producto_id
        )

        if not producto:
            raise HTTPException(
                status_code=404,
                detail="Producto no encontrado"
            )

        return producto


# GET todos los productos
@router.get("/", response_model=list[ProductoRead])
def listar_productos(
    categoria: Optional[str] = Query(None),
    session: Session = Depends(get_session)
):
    """"
    Lista todos los productos de la base de datos.
    
    """
    query = select(Producto)

    if categoria:
        query = query.where(
            Producto.categoria == categoria
        )

    productos = session.exec(query).all()

    return productos


# GET producto por ID
@router.get("/{producto_id}", response_model=ProductoRead)
def obtener_producto(
    producto_id: int,
    session: Session = Depends(get_session)
):
    producto = obtener_producto_o_404(
        producto_id,
        session 
    )
    


# POST crear producto
@router.post(
    "/",
    response_model=ProductoRead,
    status_code=status.HTTP_201_CREATED
)
def crear_producto(
    producto: ProductoCreate,
    session: Session = Depends(get_session)
):
    """
    Crea un nuevo producto en la base de datos.
    
    """
    nuevo_producto = Producto(
        **producto.model_dump()
    )

    session.add(nuevo_producto)
    session.commit()
    session.refresh(nuevo_producto)

    return nuevo_producto



# PUT actualizar producto
@router.put("/{producto_id}", response_model=ProductoRead)
def actualizar_producto(
    producto_id: int,
    datos: ProductoUpdate,
    session: Session = Depends(get_session)
):
    """"
    Actualiza un producto existente en la base de datos.
     
    """
    producto = obtener_producto_o_404(
        producto_id,
        session
    )

    datos_actualizados = datos.model_dump(
        exclude_unset=True
    )

    for campo, valor in datos_actualizados.items():
        setattr(
            producto,
            campo,
            valor
        )

    session.add(producto)
    session.commit()
    session.refresh(producto)

    return producto


# DELETE eliminar producto
@router.delete("/{producto_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_producto(
    producto_id: int,
    session: Session = Depends(get_session)
):
    """
    Elimina un producto de la base de datos.
    
    """
    producto = obtener_producto_o_404(
        producto_id,
        session
    )

    session.delete(producto)
    session.commit()

    return {
        "mensaje": "Producto eliminado correctamente"
    }