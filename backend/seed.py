from sqlmodel import Session, select

from database import engine
from models import Producto, DetallePedido


productos = [

    # ======================
    # RAMOS
    # ======================

    {
        "nombre": "Ramo Rosas Rojas",
        "descripcion": "Hermoso ramo de rosas rojas frescas.",
        "precio": 250,
        "categoria": "Ramos",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1790822660/pexels-ndumiso-zimu-282936158-36948143.jpg",
        "stock": 10
    },
    {
        "nombre": "Ramo Tulipanes",
        "descripcion": "Elegante ramo de tulipanes de colores.",
        "precio": 300,
        "categoria": "Ramos",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1790823166/pexels-aaa333-7071555.jpg",
        "stock": 8
    },
    {
        "nombre": "Ramo Mixto",
        "descripcion": "Combinación de flores frescas para cualquier ocasión.",
        "precio": 200,
        "categoria": "Ramos",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1790822543/pexels-rebornfilmes-34318997.jpg",
        "stock": 12
    },
    {
        "nombre": "Calma Purpura",
        "descripcion": "Ramo de rosas purpuras de excelente calidad.",
        "precio": 200,
        "categoria": "Ramos",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1790913192/descarga_6.jpg",
        "stock": 7
    },
    {
        "nombre": "Ramo Blanco",
        "descripcion": "Ramo floral blanco para ocasiones especiales.",
        "precio": 200,
        "categoria": "Ramos",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1790823225/pexels-mathilde-12032340.jpg",
        "stock": 9
    },
    {
        "nombre": "Ramo Girasoles",
        "descripcion": "Hermoso ramo de girasoles naturales.",
        "precio": 200,
        "categoria": "Ramos",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1790823310/pexels-syd-trgt-335495720-37483804.jpg",
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
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1790824239/pexels-samuel-rodriguez-1597507451-31870268.jpg",
        "stock": 10
    },
    {
        "nombre": "Arreglo Tulipanes",
        "descripcion": "Elegante arreglo de tulipanes de colores.",
        "precio": 300,
        "categoria": "Arreglos",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1790824381/pexels-natalie-bond-320378-15003110.jpg",
        "stock": 8
    },
    {
        "nombre": "Arreglo Mixto",
        "descripcion": "Combinación de flores frescas para cualquier ocasión.",
        "precio": 200,
        "categoria": "Arreglos",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1790824456/pexels-shivankesh-31776894.jpg",
        "stock": 12
    },
    {
        "nombre": "Arreglo Lirios",
        "descripcion": "Arreglo de lirios blancos de excelente calidad.",
        "precio": 200,
        "categoria": "Arreglos",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1790824505/pexels-anna-nekrashevich-7815234.jpg",
        "stock": 7
    },
    {
        "nombre": "Arreglo Blanco",
        "descripcion": "Arreglo floral blanco para ocasiones especiales.",
        "precio": 200,
        "categoria": "Arreglos",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1790824551/pexels-palomalimafotos-37606476.jpg",
        "stock": 9
    },
    {
        "nombre": "Arreglo Girasoles",
        "descripcion": "Hermoso arreglo de girasoles naturales.",
        "precio": 200,
        "categoria": "Arreglos",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1790821868/pexels-planka-26125615.jpg",
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
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1790909497/descarga_3.jpg",
        "stock": 10
    },
    {
        "nombre": "Corona Tulipanes",
        "descripcion": "Hermosa corona de tulipanes para expresar respeto y condolencias.",
        "precio": 300,
        "categoria": "Funebres",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1790908952/descarga_1.jpg",
        "stock": 8
    },
    {
        "nombre": "Corona Mixta",
        "descripcion": "Corona floral mixta en tonos elegantes para ocasiones de condolencia.",
        "precio": 200,
        "categoria": "Funebres",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1790908811/descarga.jpg",
        "stock": 12
    },
    {
        "nombre": "Corona Lirios",
        "descripcion": "Corona de lirios blancos de elegante presentación para expresar condolencias.",
        "precio": 200,
        "categoria": "Funebres",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1790909037/Serenity_Wreath.jpg",
        "stock": 7
    },
    {
        "nombre": "Corona Blanca",
        "descripcion": "Corona floral blanca de estilo sobrio para homenajes y servicios funerarios.",
        "precio": 200,
        "categoria": "Funebres",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1790909119/descarga_2.jpg",
        "stock": 9
    },
    {
        "nombre": "Corona Girasoles",
        "descripcion": "Hermosa corona de girasoles naturales para rendir homenaje a un ser querido.",
        "precio": 200,
        "categoria": "Funebres",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1790909209/Sunflowers_wreath.jpg",
        "stock": 15
    },


    # ======================
    # EVENTOS
    # ======================

    {
        "nombre": "Decoración de Cumpleaños",
        "descripcion": "Composición de globos ideal para bodas, aniversarios y celebraciones románticas.",
        "precio": 250,
        "categoria": "Eventos",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1790911491/EL_PRIMER_CUMPLEA%C3%91OS_MERECE_UNA_DECORACI%C3%93N_INOLVIDABLE___El_primer_a%C3%B1ito_es_un_momento_%C3%BAnico_que_merece_fotos_hermosas_y_recuerd.jpg",
        "stock": 15
    },
    {
        "nombre": "Decoración de Gala",
        "descripcion": "Alegre decoración ideal para eventos especiales y recepciones elegantes.",
        "precio": 200,
        "categoria": "Eventos",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1790911604/pexels-bertellifotografia-16935897.jpg",
        "stock": 4
    },
    {
        "nombre": "Decoracion Romantica",
        "descripcion": "Decoración romántica ideal para ocasiones especiales y aniversarios.",
        "precio": 200,
        "categoria": "Eventos",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1790911861/descarga_4.jpg",
        "stock": 6
    },
    {
        "nombre": "Decoración de Bodas",
        "descripcion": "Decoración floral elegante para bodas, ceremonias y recepciones.",
        "precio": 200,
        "categoria": "Eventos",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1790912244/descarga_5.jpg",
        "stock": 10
    },
    {
        "nombre": "Baby Shower",
        "descripcion": "Decoración especial para baby showers, ide perfecta para celebrar el nacimiento de un bebé.",
        "precio": 200,
        "categoria": "Eventos",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1790912429/pexels-th2city-30484893.jpg",
        "stock": 8
    },
    {
        "nombre": "Graduación",
        "descripcion": "Decoración ideal para fiestas de graduación, perfecta para celebrar el logro académico.",
        "precio": 200,
        "categoria": "Eventos",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1790912549/Ideas_de_decoraci%C3%B3n_para_una_fiesta_de_egresados_-_Todo_Bonito.jpg",
        "stock": 12
    },


   
    # ======================
    # CUMPLEAÑOS
    # ======================

    {
        "nombre": "Ramo Cumpleaños Rosas",
        "descripcion": "Hermoso ramo de rosas para celebrar un cumpleaños de manera especial.",
        "precio": 250,
        "categoria": "Cumpleaños",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1791509214/pexels-rehman-yousaf-321165099-30319663.jpg",
        "stock": 10
    },
    {
        "nombre": "Ramo  Alegria",
        "descripcion": "Colorido ramo de flores ideal para sorprender en un cumpleaños.",
        "precio": 300,
        "categoria": "Cumpleaños",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1791509287/pexels-mine-demirkurt-333081233-32091259.jpg",
        "stock": 8
    },
    {
        "nombre": "Ramo Cumpleaños Mixto",
        "descripcion": "Alegre combinación de flores frescas perfecta para celebrar un cumpleaños.",
        "precio": 200,
        "categoria": "Cumpleaños",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1791509390/pexels-samuel-rodriguez-1597507451-31870262.jpg",
        "stock": 12
    },
    {
        "nombre": "Ramo Cumpleaños Blanco",
        "descripcion": "Elegante ramo floral para regalar y celebrar un cumpleaños especial.",
        "precio": 250,
        "categoria": "Cumpleaños",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1791509454/pexels-ivan-s-7910902.jpg",
        "stock": 9
    },
    {
        "nombre": "Ramo Cumpleaños Girasoles",
        "descripcion": "Alegre ramo de girasoles para llenar de color una celebración de cumpleaños.",
        "precio": 250,
        "categoria": "Cumpleaños",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1791509550/Sunshine_Charm_Bouquet___Aesthetic_Sunflower_Bouquet_Idea.jpg",
        "stock": 15
    },
    {
        "nombre": "Ramo Cumpleaños Especial",
        "descripcion": "Hermoso ramo floral diseñado para sorprender en un cumpleaños.",
        "precio": 300,
        "categoria": "Cumpleaños",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1791509589/pexels-manie-rehman-yousaf-1532118890-36352069.jpg",
        "stock": 10
    },


    # ======================
    # ANIVERSARIO
    # ======================

    {
        "nombre": "Ramo Aniversario Rosas",
        "descripcion": "Ramo de rosas rojas ideal para celebrar el amor y un aniversario especial.",
        "precio": 300,
        "categoria": "Aniversario",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1791509917/descarga_7.jpg",
        "stock": 10
    },
    {
        "nombre": "Ramo Aniversario Tulipanes",
        "descripcion": "Elegante ramo de tulipanes para celebrar un aniversario lleno de amor.",
        "precio": 320,
        "categoria": "Aniversario",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1791509785/Pink_White_Tulips_Flower_Bouquet_.jpg",
        "stock": 8
    },
    {
        "nombre": "Ramo Aniversario Mixto",
        "descripcion": "Delicada combinación de flores frescas para celebrar una fecha especial en pareja.",
        "precio": 280,
        "categoria": "Aniversario",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1791512642/pexels-ladyhelga-26083404.jpg",
        "stock": 12
    },
    {
        "nombre": "Arreglo Aniversario Romántico",
        "descripcion": "Romántico arreglo floral ideal para expresar amor y celebrar un aniversario.",
        "precio": 350,
        "categoria": "Aniversario",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1791512781/Roses.jpg",
        "stock": 10
    },
    {
        "nombre": "Arreglo Aniversario Blanco",
        "descripcion": "Elegante arreglo de flores blancas para celebrar una fecha inolvidable.",
        "precio": 300,
        "categoria": "Aniversario",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1791512900/x100.jpg",
        "stock": 9
    },
    {
        "nombre": "Arreglo Aniversario Especial",
        "descripcion": "Hermoso arreglo floral preparado para celebrar el amor y los momentos compartidos.",
        "precio": 350,
        "categoria": "Aniversario",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1791513049/descarga_8.jpg",
        "stock": 10
    },


    # ======================
    # AMISTAD
    # ======================

    {
        "nombre": "Ramo Amistad",
        "descripcion": "Hermoso ramo de flores para celebrar una amistad especial.",
        "precio": 250,
        "categoria": "Amistad",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1791513170/Pink_Muse_thepinkmuse_on_X.jpg",
        "stock": 10
    },
    {
        "nombre": "Ramo Amistad Colorido",
        "descripcion": "Alegre ramo de flores de colores para sorprender a un amigo o amiga.",
        "precio": 280,
        "categoria": "Amistad",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1791513251/Ramo_de_flores.jpg",
        "stock": 12
    },
    {
        "nombre": "Ramo Amistad Tulipanes",
        "descripcion": "Colorido ramo de tulipanes perfecto para demostrar cariño y amistad.",
        "precio": 300,
        "categoria": "Amistad",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1791513317/descarga_9.jpg",
        "stock": 8
    },
    {
        "nombre": "Arreglo Amistad Girasoles",
        "descripcion": "Alegre arreglo de girasoles para regalar a una persona especial.",
        "precio": 250,
        "categoria": "Amistad",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1791513374/descarga_10.jpg",
        "stock": 15
    },
    {
        "nombre": "Arreglo Amistad Mixto",
        "descripcion": "Hermosa combinación de flores frescas para celebrar una gran amistad.",
        "precio": 250,
        "categoria": "Amistad",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1791513449/descarga_11.jpg",
        "stock": 12
    },
    {
        "nombre": "Arreglo Amistad Especial",
        "descripcion": "Elegante arreglo floral para demostrar aprecio y cariño a un amigo o amiga.",
        "precio": 300,
        "categoria": "Amistad",
        "imagen_url": "https://res.cloudinary.com/c5pevdyi/image/upload/v1791513508/descarga_12.jpg",
        "stock": 10
    }

]


# CARGAR PRODUCTOS


with Session(engine) as session:

   
    # LIMPIAR PRODUCTOS ANTIGUOS 

    # Obtener todas las categorías utilizadas actualmente en el seed
    categorias_seed = {
        producto["categoria"]
        for producto in productos
    }

    # Obtener todos los productos actuales de la base de datos
    productos_actuales = session.exec(
        select(Producto)
    ).all()

    for producto_actual in productos_actuales:

        # Verificar si existe en el seed un producto
        # con el mismo nombre y categoría
        existe_en_seed = any(
            producto["nombre"] == producto_actual.nombre
            and producto["categoria"] == producto_actual.categoria
            for producto in productos
        )

        # Si pertenece a una categoría administrada por el seed
        # pero ya no existe en el seed, lo eliminamos.
        if (
            producto_actual.categoria in categorias_seed
            and not existe_en_seed
        ):

            # Verificar si el producto ya fue utilizado
            # en algún pedido
            detalle_existente = session.exec(
                select(DetallePedido).where(
                    DetallePedido.producto_id == producto_actual.id
                )
            ).first()

            if detalle_existente:

                # No eliminar productos que ya forman parte
                # del historial de pedidos
                print(
                    f"Producto conservado: "
                    f"'{producto_actual.nombre}' "
                    f"(ya está asociado a un pedido)."
                )

            else:

                session.delete(producto_actual)

                print(
                    f"Producto eliminado: "
                    f"'{producto_actual.nombre}' "
                    f"({producto_actual.categoria})"
                )


    # CREAR / ACTUALIZAR PRODUCTOS

    for datos in productos:

        # Buscar producto por nombre + categoría
        existente = session.exec(
            select(Producto).where(
                Producto.nombre == datos["nombre"],
                Producto.categoria == datos["categoria"]
            )
        ).first()

        if existente:

            # Actualizar datos del producto existente
            existente.imagen_url = datos["imagen_url"]
            existente.descripcion = datos["descripcion"]
            existente.precio = datos["precio"]
            existente.stock = datos["stock"]

            session.add(existente)

            print(
                f"'{datos['nombre']}' actualizado."
            )

        else:

            # Crear producto nuevo
            producto = Producto(**datos)

            session.add(producto)

            print(
                f"'{datos['nombre']}' creado."
            )


    # GUARDAR CAMBIOS

    session.commit()


print("Productos cargados correctamente.")

        