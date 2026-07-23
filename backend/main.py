from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import init_db
from routers.productos import router as productos_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Crear tablas al iniciar la aplicación
    init_db()

    yield


app = FastAPI(
    title="Tulipa API",
    version="1.0.0",
    lifespan=lifespan,
)


# Rutas de productos
app.include_router(productos_router)


# Configuración para conectar React/Vite
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
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
    return {
        "status": "ok",
        "database": "ready"
    }