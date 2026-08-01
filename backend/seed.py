from sqlmodel import Session, select

from database import engine
from models import Producto


productos = [

    # ======================
    # RAMOS
    # ======================

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
    },


    # ======================
    # ARREGLOS
    # ======================

    {
        "nombre": "Dulce secreto",
        "descripcion": "Hermoso arreglo floral para ocasiones especiales.",
        "precio": 250,
        "categoria": "Arreglos",
        "imagen_url": "https://images.pexels.com/photos/36766847/pexels-photo-36766847.jpeg",
        "stock": 10
    },
    {
        "nombre": "Arreglo Tulipanes",
        "descripcion": "Elegante arreglo de tulipanes de colores.",
        "precio": 300,
        "categoria": "Arreglos",
        "imagen_url": "https://images.pexels.com/photos/35130793/pexels-photo-35130793.jpeg",
        "stock": 8
    },
    {
        "nombre": "Arreglo Mixto",
        "descripcion": "Combinación de flores frescas para cualquier ocasión.",
        "precio": 200,
        "categoria": "Arreglos",
        "imagen_url": "https://images.pexels.com/photos/33316219/pexels-photo-33316219.jpeg",
        "stock": 12
    },
    {
        "nombre": "Arreglo Lirios",
        "descripcion": "Arreglo de lirios blancos de excelente calidad.",
        "precio": 200,
        "categoria": "Arreglos",
        "imagen_url": "https://images.pexels.com/photos/37182584/pexels-photo-37182584.jpeg",
        "stock": 7
    },
    {
        "nombre": "Arreglo Blanco",
        "descripcion": "Arreglo floral blanco para ocasiones especiales.",
        "precio": 200,
        "categoria": "Arreglos",
        "imagen_url": "https://images.pexels.com/photos/31505803/pexels-photo-31505803.jpeg",
        "stock": 9
    },
    {
        "nombre": "Arreglo Girasoles",
        "descripcion": "Hermoso arreglo de girasoles naturales.",
        "precio": 200,
        "categoria": "Arreglos",
        "imagen_url": "https://images.pexels.com/photos/18532008/pexels-photo-18532008.jpeg",
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