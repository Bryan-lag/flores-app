from fastapi import APIRouter, Depends, HTTPException, status

from auth import admin_requerido, crear_token, verificar_password
from schemas.admin import LoginRequest, TokenResponse


router = APIRouter(
    prefix="/admin",
    tags=["admin"]
)


@router.post("/login", response_model=TokenResponse)
def login(datos: LoginRequest):
    """
    Verifica la contraseña de administrador y devuelve un token válido
    por 12 horas. Este token se envía en el header Authorization de
    las rutas de administrador.
    """
    if not verificar_password(datos.contrasena):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Contraseña incorrecta"
        )

    return TokenResponse(access_token=crear_token())


@router.get("/me")
def verificar_sesion(admin=Depends(admin_requerido)):
    """
    El frontend llama esta ruta al cargar el panel para confirmar que
    el token guardado todavía es válido.
    """
    return {"autenticado": True}

