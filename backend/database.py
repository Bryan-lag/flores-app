import os
from pathlib import Path

from dotenv import load_dotenv
from sqlmodel import SQLModel, Session, create_engine


BASE_DIR = Path(__file__).resolve().parent

load_dotenv(BASE_DIR / ".env")


DATABASE_URL = os.getenv("DATABASE_URL")


if not DATABASE_URL:
    raise RuntimeError("No existe DATABASE_URL en el archivo .env")


engine = create_engine(
    DATABASE_URL,
    echo=True,
    pool_pre_ping=True
)


def get_session():
    with Session(engine) as session:
        yield session


def init_db():
    SQLModel.metadata.create_all(engine)