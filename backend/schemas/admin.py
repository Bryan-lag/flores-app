from sqlmodel import SQLModel


class LoginRequest(SQLModel):
    contrasena: str


class TokenResponse(SQLModel):
    access_token: str
    token_type: str = "bearer"