import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, text

from database import engine
from routers.admin import router as admin_router
from routers.productos import router as productos_router
from routers.pedidos import router as pedidos_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # El esquema de la base de datos lo crea/actualiza Alembic
    # ("alembic upgrade head"), no la aplicación al arrancar.
    yield


app = FastAPI(
    title="Tulipa API",
    version="1.0.0",
    lifespan=lifespan,
)

# Rutas de productos
app.include_router(productos_router)

# Rutas de pedidos
app.include_router(pedidos_router)

# Rutas de administrador
app.include_router(admin_router)



# Configuración para conectar React/Vite
origins = [
    origen.strip()
    for origen in os.getenv(
        "CORS_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173",
    ).split(",")
    if origen.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "status": "ok",
        "message": "Tulipa API funcionando"
    }


@app.get("/health")
def health():
    try:
        with Session(engine) as session:
            session.exec(text("SELECT 1"))
        database_status = "ready"
    except Exception:
        database_status = "unreachable"

    return {
        "status": "ok" if database_status == "ready" else "degraded",
        "database": database_status
    }