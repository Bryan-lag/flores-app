import os
from datetime import datetime, timedelta, timezone

import bcrypt
import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer


SECRET_KEY = os.getenv("ADMIN_SECRET_KEY")
PASSWORD_HASH = os.getenv("ADMIN_PASSWORD_HASH")
ALGORITHM = "HS256"
DURACION_TOKEN_HORAS = 12


security = HTTPBearer(auto_error=False)


def verificar_password(password: str) -> bool:
    if not PASSWORD_HASH:
        return False

    return bcrypt.checkpw(
        password.encode("utf-8"),
        PASSWORD_HASH.encode("utf-8"),
    )


def crear_token() -> str:
    if not SECRET_KEY:
        raise RuntimeError("Falta ADMIN_SECRET_KEY en el archivo .env")

    expira = datetime.now(timezone.utc) + timedelta(hours=DURACION_TOKEN_HORAS)

    return jwt.encode(
        {"rol": "admin", "exp": expira},
        SECRET_KEY,
        algorithm=ALGORITHM,
    )


def admin_requerido(
    credenciales: HTTPAuthorizationCredentials = Depends(security),
):
    """
    Dependencia para proteger rutas de administrador.
    Exige un token válido en el header 'Authorization: Bearer <token>'.
    """
    if credenciales is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Se requiere iniciar sesión como administrador",
        )

    if not SECRET_KEY:
        raise RuntimeError("Falta ADMIN_SECRET_KEY en el archivo .env")

    try:
        jwt.decode(credenciales.credentials, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="La sesión expiró, inicia sesión de nuevo",
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido",
        )