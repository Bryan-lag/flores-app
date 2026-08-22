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
    },
    
    
    # ======================
    # FUNEBRES
    # ======================

    {
        "nombre": "Corona Roja",
        "descripcion": "Elegante corona floral roja para honrar y recordar a un ser querido.",
        "precio": 250,
        "categoria": "Funebres",
        "imagen_url": "https://images.pexels.com/photos/33327027/pexels-photo-33327027.jpeg",
        "stock": 10
    },
    {
        "nombre": "Corona Tulipanes",
        "descripcion": "Hermosa corona de tulipanes para expresar respeto y condolencias.",
        "precio": 300,
        "categoria": "Funebres",
        "imagen_url": "https://images.pexels.com/photos/31624870/pexels-photo-31624870.jpeg",
        "stock": 8
    },
    {
        "nombre": "Corona Mixta",
        "descripcion": "Corona floral mixta en tonos elegantes para ocasiones de condolencia.",
        "precio": 200,
        "categoria": "Funebres",
        "imagen_url": "https://images.pexels.com/photos/14838568/pexels-photo-14838568.jpeg",
        "stock": 12
    },
    {
        "nombre": "Corona Lirios",
        "descripcion": "Corona de lirios blancos de elegante presentación para expresar condolencias.",
        "precio": 200,
        "categoria": "Funebres",
        "imagen_url": "https://images.pexels.com/photos/1033141/pexels-photo-1033141.jpeg",
        "stock": 7
    },
    {
        "nombre": "Corona Blanca",
        "descripcion": "Corona floral blanca de estilo sobrio para homenajes y servicios funerarios.",
        "precio": 200,
        "categoria": "Funebres",
        "imagen_url": "https://images.pexels.com/photos/273941/pexels-photo-273941.jpeg",
        "stock": 9
    },
    {
        "nombre": "Corona Girasoles",
        "descripcion": "Hermosa corona de girasoles naturales para rendir homenaje a un ser querido.",
        "precio": 200,
        "categoria": "Funebres",
        "imagen_url": "https://images.pexels.com/photos/1562262/pexels-photo-1562262.jpeg",
        "stock": 15
    },
    
    # ======================
    # EVENTOS
    # ======================


    {
        "nombre": "Decoración Floral Romántica",
        "descripcion": "Composición de rosas rojas ideal para bodas, aniversarios y celebraciones románticas.",
        "precio": 250,
        "categoria": "Eventos",
        "imagen_url": "https://images.pexels.com/photos/14457438/pexels-photo-14457438.jpeg",
        "stock": 15
    },
    {
        "nombre": "Decoración de Tulipanes",
        "descripcion": "Elegante composición de tulipanes para decorar bodas, recepciones y eventos especiales.",
        "precio": 300,
        "categoria": "Eventos",
        "imagen_url": "https://images.pexels.com/photos/1682473/pexels-photo-1682473.jpeg",
        "stock": 4
    },
    {
        "nombre": "Centro Floral Mixto",
        "descripcion": "Arreglo de flores variadas diseñado para mesas y espacios de celebraciones especiales.",
        "precio": 200,
        "categoria": "Eventos",
        "imagen_url": "https://images.pexels.com/photos/11474201/pexels-photo-11474201.jpeg",
        "stock": 6
    },
    {
        "nombre": "Decoración Floral con Lirios",
        "descripcion": "Elegante composición de lirios para ambientar bodas, ceremonias y eventos formales.",
        "precio": 200,
        "categoria": "Eventos",
        "imagen_url": "https://images.pexels.com/photos/11282245/pexels-photo-11282245.jpeg",
        "stock": 10
    },
    {
        "nombre": "Montaje Floral Blanco",
        "descripcion": "Decoración floral en tonos blancos ideal para bodas, sesiones fotográficas y celebraciones elegantes.",
        "precio": 200,
        "categoria": "Eventos",
        "imagen_url": "https://images.pexels.com/photos/37058552/pexels-photo-37058552.jpeg",
        "stock": 8
    },
    {
        "nombre": "Decoración de Girasoles",
        "descripcion": "Alegre composición de girasoles para decorar celebraciones, fiestas y eventos al aire libre.",
        "precio": 200,
        "categoria": "Eventos",
        "imagen_url": "https://images.pexels.com/photos/5610373/pexels-photo-5610373.jpeg",
        "stock": 12
    }
]


from sqlmodel import Session, select

from database import engine
from models import Producto


with Session(engine) as session:

    for datos in productos:

        existente = session.exec(
            select(Producto).where(
                Producto.nombre == datos["nombre"],
                Producto.categoria == datos["categoria"]
            )
        ).first()

        if existente:
            existente.imagen_url = datos["imagen_url"]
            existente.descripcion = datos["descripcion"]
            existente.precio = datos["precio"]
            existente.stock = datos["stock"]

            session.add(existente)

            print(f"'{datos['nombre']}' actualizado.")

        else:
            producto = Producto(**datos)
            session.add(producto)

            print(f"'{datos['nombre']}' creado.")

    session.commit()


print("Productos cargados correctamente.")