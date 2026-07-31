from sqlmodel import Session, select

from database import engine
from models import Producto


productos = [
    {
        "nombre": "Ramo Rosas Rojas",
        "descripcion": "Hermoso ramo de rosas rojas frescas.",
        "precio": 250,
        "categoria": "Ramos",
        "imagen_url": "https://images.pexels.com/photos/30190588/pexels-photo-30190588.jpeg",
        "stock": 10
    },
    {
        "nombre": "Ramo Tulipanes",
        "descripcion": "Elegante ramo de tulipanes de colores.",
        "precio": 300,
        "categoria": "Ramos",
        "imagen_url": "https://images.pexels.com/photos/3612784/pexels-photo-3612784.jpeg",
        "stock": 8
    },
    {
        "nombre": "Ramo Mixto",
        "descripcion": "Combinación de flores frescas para cualquier ocasión.",
        "precio": 200,
        "categoria": "Ramos",
        "imagen_url": "https://images.pexels.com/photos/20375354/pexels-photo-20375354.jpeg",
        "stock": 12
    },
    {
        "nombre": "Ramo Lirios",
        "descripcion": "Ramo de lirios blancos de excelente calidad.",
        "precio": 200,
        "categoria": "Ramos",
        "imagen_url": "https://images.pexels.com/photos/29466625/pexels-photo-29466625.jpeg",
        "stock": 7
    },
    {
        "nombre": "Ramo Blanco",
        "descripcion": "Arreglo floral blanco para ocasiones especiales.",
        "precio": 200,
        "categoria": "Ramos",
        "imagen_url": "https://images.pexels.com/photos/31950130/pexels-photo-31950130.jpeg",
        "stock": 9
    },
    {
        "nombre": "Ramo Girasoles",
        "descripcion": "Hermoso ramo de girasoles naturales.",
        "precio": 200,
        "categoria": "Ramos",
        "imagen_url": "https://images.pexels.com/photos/35524820/pexels-photo-35524820.jpeg",
        "stock": 15
    }
]


with Session(engine) as session:

    for datos in productos:

        existente = session.exec(
            select(Producto).where(
                Producto.nombre == datos["nombre"]
            )
        ).first()

        if existente:
            print(f"'{datos['nombre']}' ya existe.")
            continue

        producto = Producto(**datos)
        session.add(producto)

    session.commit()

print("Productos cargados correctamente.")