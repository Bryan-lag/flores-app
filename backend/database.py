import os
from pathlib import Path

from dotenv import load_dotenv
from sqlmodel import SQLModel, Session, create_engine


BASE_DIR = Path(__file__).resolve().parent

load_dotenv(BASE_DIR / ".env")


DATABASE_URL = os.getenv("DATABASE_URL")


if not DATABASE_URL:
    raise RuntimeError("No existe DATABASE_URL en el archivo .env")


# echo=True imprime cada consulta SQL en la consola. Útil al depurar,
# ruidoso en producción: se activa solo si SQL_ECHO=true en el .env.
SQL_ECHO = os.getenv("SQL_ECHO", "false").lower() == "true"

engine = create_engine(
    DATABASE_URL,
    echo=SQL_ECHO,
    pool_pre_ping=True
)


def get_session():
    with Session(engine) as session:
        yield session


def init_db():
    """
    Solo para pruebas rápidas o scripts sueltos. El esquema real de la
    base de datos lo maneja Alembic (`alembic upgrade head`); esta
    función ya no se llama al arrancar el servidor.
    """
    SQLModel.metadata.create_all(engine)