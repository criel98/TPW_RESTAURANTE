// ============================================
// EL BUEN SABOR - SCRIPT PRINCIPAL UNIFICADO
// ============================================

// ============================================
// 1. FUNCIÓN DEL MENÚ RESPONSIVE (GLOBAL)
// ============================================

function toggleMenu() {
    var menu = document.getElementById("navMenu");
    if (menu) {
        menu.classList.toggle("mostrar");
    }
}

// ============================================
// 2. PRODUCTOS - CATÁLOGO COMPLETO (DATOS)
// ============================================

const productos = [
    // ===== HAMBURGUESAS =====
    {
        id: 1,
        nombre: "Hamburguesa Clásica",
        categoria: "hamburguesa",
        precio: 20.00,
        descripcion: "Hamburguesa 100% carne de res a la parrilla preparada con lechuga fresca, tomate, cebolla, kétchup y mayonesa. Una combinación clásica de ingredientes seleccionados para brindar un sabor auténtico y equilibrado.",
        imagen: "imagenes/Productos/Clasica.jpeg",
        badge: "Popular",
        destacado: true,
        ingredientes: ["Carne de res", "Lechuga", "Tomate", "Cebolla", "Kétchup", "Mayonesa"],
        alergenos: ["Gluten", "Huevo y derivados", "Sésamo"],
        nutricion: {
            peso: "220 g",
            calorias: 550,
            grasas: "30 g",
            carbohidratos: "38 g",
            proteinas: "28 g",
            sodio: "850 mg",
            azucares: "8 g",
            grasasTrans: "0.5 g",
            grasasSaturadas: "11 g",
            fibra: "3 g",
            idr: {
                calorias: "28%",
                grasas: "43%",
                carbohidratos: "13%",
                proteinas: "56%",
                sodio: "35%",
                azucares: "9%",
                grasasSaturadas: "55%",
                fibra: "12%"
            }
        },
        configuracion: {
            tamanos: [
                {nombre: "Mediana", extra: 0},
                {nombre: "Grande", extra: 3}
            ],
            extras: [
                {nombre: "Queso", extra: 2},
                {nombre: "Tocino", extra: 3},
                {nombre: "Pepinillos", extra: 2}
            ],
            salsas: ["Ketchup", "Mayonesa", "BBQ"]

        }
    },
    {
        id: 2,
        nombre: "Hamburguesa Grande",
        categoria: "hamburguesa",
        precio: 30.00,
        descripcion: "Hamburguesa 100% carne de res a la parrilla preparada con tomate fresco, lechuga, mayonesa, kétchup, pepinillos y cebolla. Una combinación de ingredientes seleccionados para brindar una experiencia de sabor más intensa y una porción más abundante.",
        imagen: "imagenes/Productos/hamburguesa grande.jpeg",
        badge: "Recomendado",
        destacado: true,
        ingredientes: ["Carne de res", "Tomate", "Lechuga", "Mayonesa", "Kétchup", "Pepinillos", "Cebolla"],
        alergenos: ["Gluten", "Huevo y derivados", "Mostaza", "Sésamo"],
        nutricion: {
            peso: "300 g",
            calorias: 720,
            grasas: "42 g",
            carbohidratos: "45 g",
            proteinas: "38 g",
            sodio: "1050 mg",
            azucares: "10 g",
            grasasTrans: "0.7 g",
            grasasSaturadas: "15 g",
            fibra: "4 g",
            idr: {
                calorias: "36%",
                grasas: "60%",
                carbohidratos: "15%",
                proteinas: "76%",
                sodio: "44%",
                azucares: "11%",
                grasasSaturadas: "75%",
                fibra: "16%"
            }
        },
        configuracion: {
            tamanos: [
                {nombre: "Mediana", extra: 0},
                {nombre: "Grande", extra: 0}
            ],
            extras: [
                {nombre: "Queso", extra: 2},
                {nombre: "Tocino", extra: 3},
                {nombre: "Pepinillos", extra: 2},
                {nombre: "Cebolla extra", extra: 1}
            ],
            salsas: ["Mayonesa", "BBQ"]
        }
    },
    {
        id: 3,
        nombre: "Doble carne con Tocino",
        categoria: "hamburguesa",
        precio: 28.00,
        descripcion: "Doble hamburguesa 100% carne de res a la parrilla acompañada de queso fundido y crujientes láminas de tocino. Una combinación intensa y jugosa diseñada para quienes buscan un sabor más contundente y una experiencia gastronómica más completa.",
        imagen: "imagenes/Productos/carne y tocino.jpeg",
        badge: "🔥 Especial",
        destacado: true,
        ingredientes: ["Doble carne de res", "Queso americano", "Tocino crujiente"],
        alergenos: ["Gluten", "Leche y derivados", "Soya y derivados", "Sésamo"],
        nutricion: {
            peso: "360 g",
            calorias: 850,
            grasas: "55 g",
            carbohidratos: "40 g",
            proteinas: "52 g",
            sodio: "1250 mg",
            azucares: "9 g",
            grasasTrans: "1 g",
            grasasSaturadas: "22 g",
            fibra: "3 g",
            idr: {
                calorias: "43%",
                grasas: "79%",
                carbohidratos: "13%",
                proteinas: "104%",
                sodio: "52%",
                azucares: "10%",
                grasasSaturadas: "110%",
                fibra: "12%"
            }
        },
        configuracion: {
            tamanos: [
                {nombre: "Estándar", extra: 0},
                {nombre: "Doble XL", extra: 4}
            ],
            extras: [
                {nombre: "Queso extra", extra: 2},
                {nombre: "Tocino extra", extra: 3}
            ],
            salsas: ["BBQ"]
        }
    },
    {
        id: 4,
        nombre: "Hamburguesa Tejana",
        categoria: "hamburguesa",
        precio: 22.00,
        descripcion: "Hamburguesa 100% carne de res a la parrilla preparada con queso, tocino crujiente, tomate fresco, lechuga, mayonesa, salsa BBQ, pepinillos y cebolla. Una combinación de sabores intensos que mezcla lo dulce y ahumado de la BBQ con la jugosidad de la carne.",
        imagen: "imagenes/Productos/Tejana.jpeg",
        badge: null,
        destacado: false,
        ingredientes: ["Carne de res", "Queso", "Tocino", "Salsa BBQ", "Tomate", "Lechuga", "Mayonesa", "Pepinillos", "Cebolla"],
        alergenos: ["Gluten", "Leche y derivados", "Huevo y derivados", "Soya y derivados", "Sésamo"],
        nutricion: {
            peso: "330 g",
            calorias: 780,
            grasas: "48 g",
            carbohidratos: "50 g",
            proteinas: "40 g",
            sodio: "1180 mg",
            azucares: "12 g",
            grasasTrans: "0.8 g",
            grasasSaturadas: "18 g",
            fibra: "4 g",
            idr: {
                calorias: "39%",
                grasas: "69%",
                carbohidratos: "17%",
                proteinas: "80%",
                sodio: "49%",
                azucares: "13%",
                grasasSaturadas: "90%",
                fibra: "16%"
            }
        },
        configuracion: {
            tamanos: [
                {nombre: "Mediana", extra: 0},
                {nombre: "Grande", extra: 3}
            ],
            extras: [
                {nombre: "Queso", extra: 2},
                {nombre: "Tocino", extra: 3},
                {nombre: "Salsa BBQ extra", extra: 1},
                {nombre: "Pepinillos", extra: 2}
            ],
            salsas: ["BBQ", "Mayonesa"]
        }
    },
    {
        id: 5,
        nombre: "Doble con queso",
        categoria: "hamburguesa",
        precio: 30.00,
        descripcion: "Doble hamburguesa 100% carne de res a la parrilla acompañada de queso fundido, pepinillos, mostaza y kétchup. Una receta clásica con doble porción de carne que resalta el sabor de sus ingredientes y ofrece una experiencia más abundante.",
        imagen: "imagenes/Productos/doble con queso.jpeg",
        badge: null,
        destacado: false,
        ingredientes: ["Doble carne de res", "Queso cheddar", "Pepinillos", "Mostaza", "Kétchup"],
        alergenos: ["Gluten", "Leche y derivados", "Mostaza", "Sésamo"],
        nutricion: {
            peso: "340 g",
            calorias: 810,
            grasas: "50 g",
            carbohidratos: "42 g",
            proteinas: "48 g",
            sodio: "1150 mg",
            azucares: "8 g",
            grasasTrans: "0.9 g",
            grasasSaturadas: "20 g",
            fibra: "3 g",
            idr: {
                calorias: "41%",
                grasas: "71%",
                carbohidratos: "14%",
                proteinas: "96%",
                sodio: "48%",
                azucares: "9%",
                grasasSaturadas: "100%",
                fibra: "12%"
            }
        },
        configuracion: {
            tamanos: [
                {nombre: "Simple", extra: 0},
                {nombre: "Doble", extra: 5}
            ],
            extras: [
                {nombre: "Queso cheddar", extra: 2},
                {nombre: "Pepinillos", extra: 2}
            ],
            salsas: ["Mostaza", "Ketchup"]
        }
    },

    // ===== COMPLEMENTOS =====
    {
        id: 6,
        nombre: "Papa Familiar",
        categoria: "complemento",
        precio: 10.00,
        descripcion: "Papas fritas doradas y crujientes para compartir. El acompañamiento perfecto para cualquier hamburguesa.",
        imagen: "imagenes/Complementos/papa familiar.jpg",
        badge: null,
        destacado: false,
        ingredientes: ["Papas", "Sal", "Aceite vegetal"],
        alergenos: ["Sin alérgenos"],
        nutricion: {
            peso: "200 g",
            calorias: 350,
            grasas: "15 g",
            carbohidratos: "50 g",
            proteinas: "4 g",
            sodio: "300 mg",
            azucares: "1 g",
            grasasTrans: "0 g",
            grasasSaturadas: "2 g",
            fibra: "5 g",
            idr: {
                calorias: "18%",
                grasas: "21%",
                carbohidratos: "17%",
                proteinas: "8%",
                sodio: "13%",
                azucares: "1%",
                grasasSaturadas: "10%",
                fibra: "20%"
            }
        },
        configuracion: {
            salsas: [
                {nombre: "Ketchup", extra: 0},
                {nombre: "Mayonesa", extra: 0},
                {nombre: "Mostaza", extra: 0},
                {nombre: "Ají", extra: 0}
            ]
        }
    },
    {
        id: 7,
        nombre: "Papa Personal",
        categoria: "complemento",
        precio: 5.00,
        descripcion: "Papas fritas doradas crujientes. El acompañamiento clásico en porción individual.",
        imagen: "imagenes/Complementos/Papapersonal.jpg",
        badge: null,
        destacado: false,
        ingredientes: ["Papas", "Sal", "Aceite vegetal"],
        alergenos: ["Sin alérgenos"],
        nutricion: {
            peso: "100 g",
            calorias: 250,
            grasas: "12 g",
            carbohidratos: "35 g",
            proteinas: "3 g",
            sodio: "200 mg",
            azucares: "0.5 g",
            grasasTrans: "0 g",
            grasasSaturadas: "1.5 g",
            fibra: "3 g",
            idr: {
                calorias: "13%",
                grasas: "17%",
                carbohidratos: "12%",
                proteinas: "6%",
                sodio: "8%",
                azucares: "1%",
                grasasSaturadas: "8%",
                fibra: "12%"
            }
        },
        configuracion: {
            salsas: [
                {nombre: "Ketchup", extra: 0},
                {nombre: "Mayonesa", extra: 0},
                {nombre: "Mostaza", extra: 0},
                {nombre: "Ají", extra: 0}
            ]
        }
    },
    {
        id: 8,
        nombre: "Coca Cola 1L",
        categoria: "complemento",
        precio: 8.00,
        descripcion: "Gaseosa Coca Cola 1 litro. La bebida refrescante perfecta para acompañar tu hamburguesa.",
        imagen: "imagenes/Complementos/coca-cola.jpg",
        badge: null,
        destacado: false,
        ingredientes: ["Agua carbonatada", "Azúcar", "Caramelo", "Cafeína"],
        alergenos: ["Sin alérgenos"],
        nutricion: {
            peso: "1000 ml",
            calorias: 450,
            grasas: "0 g",
            carbohidratos: "110 g",
            proteinas: "0 g",
            sodio: "30 mg",
            azucares: "110 g",
            grasasTrans: "0 g",
            grasasSaturadas: "0 g",
            fibra: "0 g",
            idr: {
                calorias: "23%",
                grasas: "0%",
                carbohidratos: "37%",
                proteinas: "0%",
                sodio: "1%",
                azucares: "122%",
                grasasSaturadas: "0%",
                fibra: "0%"
            }
        },
        configuracion: {
            tamanos: [
                {nombre: "500 ml", extra: -3},
                {nombre: "1L", extra: 0},
                {nombre: "1.5L", extra: 3}
            ],
            temperatura: [
                {nombre: "Helada", extra: 0},
                {nombre: "Sin helar", extra: 0}
            ]
        }
    },
    {
        id: 9,
        nombre: "Inka Cola 1L",
        categoria: "complemento",
        precio: 8.00,
        descripcion: "Gaseosa Inka Cola 1 litro. El sabor tradicional peruano que todos aman.",
        imagen: "imagenes/Complementos/iinkakola.jpg",
        badge: null,
        destacado: false,
        ingredientes: ["Agua carbonatada", "Azúcar", "Caramelo"],
        alergenos: ["Sin alérgenos"],
        nutricion: {
            peso: "1000 ml",
            calorias: 420,
            grasas: "0 g",
            carbohidratos: "105 g",
            proteinas: "0 g",
            sodio: "25 mg",
            azucares: "105 g",
            grasasTrans: "0 g",
            grasasSaturadas: "0 g",
            fibra: "0 g",
            idr: {
                calorias: "21%",
                grasas: "0%",
                carbohidratos: "35%",
                proteinas: "0%",
                sodio: "1%",
                azucares: "117%",
                grasasSaturadas: "0%",
                fibra: "0%"
            }
        },
        configuracion: {
            tamanos: [
                {nombre: "500 ml", extra: -3},
                {nombre: "1L", extra: 0},
                {nombre: "1.5L", extra: 3}
            ],
            temperatura: [
                {nombre: "Helada", extra: 0},
                {nombre: "Sin helar", extra: 0}
            ]
        }
    },
    {
        id: 10,
        nombre: "Nuggets",
        categoria: "complemento",
        precio: 10.00,
        descripcion: "5 nuggets de pollo dorados y crujientes. Perfectos para compartir o como entrada.",
        imagen: "imagenes/Complementos/nugets.jpeg",
        badge: null,
        destacado: false,
        ingredientes: ["Pollo", "Harina", "Pan rallado", "Especias"],
        alergenos: ["Gluten", "Huevo y derivados"],
        nutricion: {
            peso: "150 g",
            calorias: 300,
            grasas: "16 g",
            carbohidratos: "22 g",
            proteinas: "18 g",
            sodio: "450 mg",
            azucares: "2 g",
            grasasTrans: "0 g",
            grasasSaturadas: "4 g",
            fibra: "1 g",
            idr: {
                calorias: "15%",
                grasas: "23%",
                carbohidratos: "7%",
                proteinas: "36%",
                sodio: "19%",
                azucares: "2%",
                grasasSaturadas: "20%",
                fibra: "4%"
            }
        },
        configuracion: {
            porciones: [
                {nombre: "5 unidades", precio: 0},
                {nombre: "10 unidades", precio: 5},
                {nombre: "20 unidades", precio: 12}
            ],
            salsas: [
                {nombre: "Ketchup", extra: 0},
                {nombre: "Mayonesa", extra: 0},
                {nombre: "Mostaza", extra: 0},
                {nombre: "BBQ", extra: 1},
                {nombre: "Ají", extra: 0}
            ],
            extras: [
                {nombre: "Extra salsa", extra: 1}
            ]
        }
    }
];

// ============================================
// 3. FUNCIONES DEL CATÁLOGO (GLOBALES)
// ============================================

/**
 * Crea una tarjeta de producto para el catálogo
 */
function crearTarjetaProducto(producto) {
    const div = document.createElement('div');
    div.className = 'product-card';

    let badgeHTML = producto.badge ? `<div class="product-badge">${producto.badge}</div>` : '';

    div.innerHTML = `
        ${badgeHTML}
        <h2>${producto.nombre}</h2>
        <hr>
        <p class="descripcion">${producto.descripcion}</p>
        <img src="${producto.imagen}" alt="${producto.nombre}" class="img" />
        <h3 class="precio">S/ ${producto.precio.toFixed(2)}</h3>
        
    <div class="product-buttons">

    <a href="productos/detalle.html?id=${producto.id}"
       class="btn-detalle">
       Ver detalle
    </a>

    <button
        class="btn-agregar-carrito"
        data-id="${producto.id}">
        🛒 Agregar
    </button>

</div>
    `;

    const btnAgregar = div.querySelector('.btn-agregar-carrito');

    btnAgregar.addEventListener('click', () => {

        window.location.href =
                `productos/configurar-producto.html?id=${producto.id}`;

    });

    return div;
}

/**
 * Genera todo el catálogo de productos dinámicamente
 */
function generarCatalogo() {
    const contenedorHamburguesas = document.getElementById('hamburguesas-container');
    const contenedorComplementos = document.getElementById('complementos-container');

    if (!contenedorHamburguesas || !contenedorComplementos) {
        return;
    }

    contenedorHamburguesas.innerHTML = '';
    contenedorComplementos.innerHTML = '';

    const hamburguesas = productos.filter(p => p.categoria === 'hamburguesa');
    const complementos = productos.filter(p => p.categoria === 'complemento');

    hamburguesas.forEach(producto => {
        contenedorHamburguesas.appendChild(crearTarjetaProducto(producto));
    });

    complementos.forEach(producto => {
        contenedorComplementos.appendChild(crearTarjetaProducto(producto));
    });
}

function inicializarCarruselesProductos() {
    document.querySelectorAll('.carrusel-productos').forEach(carrusel => {
        const sliderId = carrusel.dataset.carousel;
        const slider = document.getElementById(sliderId);
        const btnNext = carrusel.querySelector('.btn-next');
        const btnPrev = carrusel.querySelector('.btn-prev');
        const dotsContainer = carrusel.querySelector('.promo-dots');

        if (!slider || !btnNext || !btnPrev)
            return;

        const crearIndicadores = () => {
            if (!dotsContainer)
                return;

            const tarjetas = Array.from(slider.querySelectorAll('.promo-card'));
            dotsContainer.innerHTML = '';

            tarjetas.forEach((tarjeta, index) => {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'promo-dot';
                dot.setAttribute('aria-label', `Ver promocion ${index + 1}`);
                dot.addEventListener('click', () => {
                    slider.scrollTo({
                        left: tarjeta.offsetLeft,
                        behavior: 'smooth'
                    });
                });
                dotsContainer.appendChild(dot);
            });
        };

        const actualizarIndicadores = () => {
            if (!dotsContainer)
                return;

            const tarjetas = Array.from(slider.querySelectorAll('.promo-card'));
            const dots = Array.from(dotsContainer.querySelectorAll('.promo-dot'));
            let activo = 0;

            tarjetas.forEach((tarjeta, index) => {
                const distanciaActual = Math.abs(tarjeta.offsetLeft - slider.scrollLeft);
                const distanciaActiva = Math.abs(tarjetas[activo].offsetLeft - slider.scrollLeft);
                if (distanciaActual < distanciaActiva)
                    activo = index;
            });

            dots.forEach((dot, index) => {
                dot.classList.toggle('activo', index === activo);
            });
        };

        const moverCarrusel = direccion => {
            const tarjeta = slider.querySelector('.product-card, .promo-card');
            const distancia = tarjeta?.classList.contains('promo-card')
                    ? slider.clientWidth + 20
                    : (tarjeta ? tarjeta.offsetWidth + 20 : 340);
            slider.scrollBy({
                left: direccion * distancia,
                behavior: 'smooth'
            });
        };

        btnNext.addEventListener('click', () => moverCarrusel(1));
        btnPrev.addEventListener('click', () => moverCarrusel(-1));
        slider.addEventListener('scroll', actualizarIndicadores);

        crearIndicadores();
        actualizarIndicadores();
    });
}

function buscarProductos(textoBusqueda) {

    const hamburguesasContainer =
            document.getElementById("hamburguesas-container");

    const complementosContainer =
            document.getElementById("complementos-container");

    if (!hamburguesasContainer || !complementosContainer)
        return;

    hamburguesasContainer.innerHTML = "";
    complementosContainer.innerHTML = "";

    const resultados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(textoBusqueda.toLowerCase()) ||
                producto.descripcion.toLowerCase().includes(textoBusqueda.toLowerCase())
    );

    resultados.forEach(producto => {

        if (producto.categoria === "hamburguesa") {
            hamburguesasContainer.appendChild(
                    crearTarjetaProducto(producto)
                    );
        } else {
            complementosContainer.appendChild(
                    crearTarjetaProducto(producto)
                    );
        }

    });

    if (!hamburguesasContainer.children.length) {
        hamburguesasContainer.innerHTML = '<p class="carrusel-vacio">No hay hamburguesas con ese nombre.</p>';
    }

    if (!complementosContainer.children.length) {
        complementosContainer.innerHTML = '<p class="carrusel-vacio">No hay complementos con ese nombre.</p>';
    }
}

// ============================================
// 4. FUNCIONES DE RECLAMOS (GLOBALES)
// ============================================

function mostrarError(campoId, mensaje) {
    const campo = document.getElementById(campoId);
    if (!campo)
        return;
    limpiarError(campoId);
    campo.classList.add('error-input');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-mensaje';
    errorDiv.id = `error-${campoId}`;
    errorDiv.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${mensaje}`;
    campo.parentNode.insertBefore(errorDiv, campo.nextSibling);
}

function limpiarError(campoId) {
    const campo = document.getElementById(campoId);
    if (campo)
        campo.classList.remove('error-input');
    const errorDiv = document.getElementById(`error-${campoId}`);
    if (errorDiv)
        errorDiv.remove();
}

function mostrarExito(nombre, tipoReclamo) {
    const tipos = {
        'producto': 'problema con el producto',
        'servicio': 'mala atención',
        'demora': 'demora en la entrega',
        'calidad': 'calidad del producto'
    };
    const tipoTexto = tipos[tipoReclamo] || 'otro tipo de reclamo';

    const modal = document.createElement('div');
    modal.className = 'modal-exito';
    modal.innerHTML = `
        <div class="modal-exito-contenido">
            <div class="modal-exito-icono"><i class="fa-solid fa-circle-check"></i></div>
            <h3>¡Reclamo Enviado!</h3>
            <p>Gracias <strong>${nombre}</strong>, tu reclamo sobre <strong>${tipoTexto}</strong> ha sido registrado.</p>
            <p>Te responderemos en máximo 48 horas.</p>
            <button onclick="this.closest('.modal-exito').remove()" class="modal-exito-btn">Aceptar</button>
        </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', function (e) {
        if (e.target === modal)
            modal.remove();
    });
}

// ============================================
// 5. INICIALIZACIÓN (DOMContentLoaded)
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // 5A. GENERAR CATÁLOGO
    // ============================================
    generarCatalogo();
    inicializarCarruselesProductos();

    const buscador = document.getElementById("buscadorProductos");
    if (buscador) {
        buscador.addEventListener("input", function () {
            buscarProductos(this.value);
        });
    }

    // ============================================
    // 5B. LOGIN Y PERSONALIZACIÓN
    // ============================================

    const elementos = {
        heroBadge: document.getElementById('heroBadge'),
        heroTitle: document.getElementById('heroTitle'),
        heroSubtitle: document.getElementById('heroSubtitle'),
        modal: document.getElementById('loginModal'),
        btnLogin: document.getElementById('btnLogin'),
        closeBtn: document.querySelector('.modal-close'),
        loginForm: document.getElementById('loginForm'),
        btnViewProducts: document.getElementById('btnViewProducts'),
        btnTop: document.getElementById('btnTop'),
        nombreInput: document.getElementById('nombreUsuario'),
        generoSelect: document.getElementById('generoUsuario')
    };

    const mensajes = {
        chico: {saludo: "¡Bienvenido", badge: "🔥 Super Delicioso 🔥", title: "El Buen Sabor", subtitle: "¡Lo mejor para ti!"},
        chica: {saludo: "¡Bienvenida", badge: "💖 Super Delicioso 💖", title: "El Buen Sabor", subtitle: "¡Hecha para ti!"},
        otro: {saludo: "¡Bienvenid@", badge: "✨ Super Delicioso ✨", title: "El Buen Sabor", subtitle: "¡Para todos los gustos!"}
    };

    let usuarioActual = null;

    const guardarSesion = (nombre, genero) => {
        usuarioActual = {nombre, genero};
        localStorage.setItem('usuarioElBuenSabor', JSON.stringify(usuarioActual));
    };

    const cerrarSesion = () => {
        localStorage.removeItem('usuarioElBuenSabor');
        location.reload();
    };

    const verificarSesion = () => {
        const guardado = localStorage.getItem('usuarioElBuenSabor');
        if (guardado) {
            usuarioActual = JSON.parse(guardado);
            personalizarPagina();
            actualizarBotonLogin();
        }
    };

    const personalizarPagina = () => {
        if (!usuarioActual)
            return;
        const m = mensajes[usuarioActual.genero] || mensajes.otro;
        if (elementos.heroBadge)
            elementos.heroBadge.innerHTML = m.badge;
        if (elementos.heroTitle)
            elementos.heroTitle.innerHTML = m.title;
        if (elementos.heroSubtitle)
            elementos.heroSubtitle.innerHTML = `${m.saludo} ${usuarioActual.nombre}! 🔥 ${m.subtitle}`;
    };

    const actualizarBotonLogin = () => {
        if (elementos.btnLogin && usuarioActual) {
            elementos.btnLogin.innerHTML = `<i class="fa-solid fa-circle-user"></i> ${usuarioActual.nombre}`;
            elementos.btnLogin.onclick = (e) => {
                e.preventDefault();
                if (confirm(`¿${usuarioActual.nombre}, deseas cerrar sesión?`))
                    cerrarSesion();
            };
        }
    };

    const mostrarNotificacion = (mensaje, tipo) => {
        const notif = document.createElement('div');
        notif.className = `notificacion-${tipo}`;
        notif.innerHTML = `<i class="fa-solid ${tipo === 'bienvenida' ? 'fa-face-smile' : 'fa-circle-exclamation'}"></i><span>${mensaje}</span>`;
        document.body.appendChild(notif);
        setTimeout(() => {
            notif.classList.add('fade-out');
            setTimeout(() => notif.remove(), 500);
        }, 4000);
    };

    const abrirModal = () => elementos.modal?.classList.add('show');
    const cerrarModal = () => elementos.modal?.classList.remove('show');

    // Botón subir
    if (elementos.btnTop) {
        elementos.btnTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }

    // Login
    verificarSesion();

    if (elementos.btnLogin && !usuarioActual) {
        elementos.btnLogin.addEventListener('click', (e) => {
            e.preventDefault();
            abrirModal();
        });
    }

    if (elementos.closeBtn)
        elementos.closeBtn.addEventListener('click', cerrarModal);
    window.addEventListener('click', (e) => {
        if (e.target === elementos.modal)
            cerrarModal();
    });

    if (elementos.loginForm) {
        elementos.loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = elementos.nombreInput?.value.trim() || '';
            const genero = elementos.generoSelect?.value || '';

            if (!nombre)
                return mostrarNotificacion('❌ Por favor, ingresa tu nombre', 'error');
            if (!genero)
                return mostrarNotificacion('❌ Por favor, selecciona tu género', 'error');

            guardarSesion(nombre, genero);
            cerrarModal();
            personalizarPagina();
            actualizarBotonLogin();

            const emoji = genero === 'chico' ? '👨' : (genero === 'chica' ? '👩' : '🌟');
            const textoGenero = genero === 'chico' ? 'o' : (genero === 'chica' ? 'a' : 'e');
            mostrarNotificacion(`${emoji} ¡Bienvenid${textoGenero} ${nombre}! Ya eres parte de El Buen Sabor 🍔`, 'bienvenida');

            if (elementos.nombreInput)
                elementos.nombreInput.value = '';
            if (elementos.generoSelect)
                elementos.generoSelect.value = '';
        });
    }

    // Botón "Ver todos los productos"
    if (elementos.btnViewProducts) {
        elementos.btnViewProducts.addEventListener('click', (e) => {
            e.preventDefault();
            if (!usuarioActual)
                return abrirModal();
            document.querySelector('#Productos')?.scrollIntoView({behavior: 'smooth'});
        });
    }

    // ============================================
    // 5C. FORMULARIO DE RECLAMOS
    // ============================================

    const formReclamo = document.getElementById('formReclamo');
    if (formReclamo) {
        formReclamo.addEventListener('submit', function (e) {
            e.preventDefault();

            let nombre = document.getElementById('nombre').value.trim();
            let apellido = document.getElementById('apellido').value.trim();
            let email = document.getElementById('email').value.trim();
            let numDoc = document.getElementById('num_doc').value.trim();
            let tipoReclamo = document.getElementById('tipo_reclamo').value;
            let reclamo = document.getElementById('reclamo').value.trim();
            let terminos = document.getElementById('terminos').checked;

            if (nombre === "") {
                mostrarError('nombre', 'Ingresa tu nombre');
                return;
            }
            if (apellido === "") {
                mostrarError('apellido', 'Ingresa tu apellido');
                return;
            }
            if (email === "") {
                mostrarError('email', 'Ingresa tu correo');
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                mostrarError('email', 'Correo inválido');
                return;
            }
            if (numDoc === "") {
                mostrarError('num_doc', 'Ingresa tu documento');
                return;
            }
            if (numDoc.length < 8) {
                mostrarError('num_doc', 'Mínimo 8 dígitos');
                return;
            }
            if (reclamo === "") {
                mostrarError('reclamo', 'Describe tu reclamo');
                return;
            }
            if (reclamo.length < 10) {
                mostrarError('reclamo', 'Mínimo 10 caracteres');
                return;
            }
            if (!terminos) {
                mostrarError('terminos', 'Acepta los términos');
                return;
            }

            mostrarExito(nombre, tipoReclamo);
            formReclamo.reset();
        });

        document.querySelectorAll('.formulario_input, .formulario_area').forEach(input => {
            input.addEventListener('input', function () {
                limpiarError(this.id);
            });
        });
        document.getElementById('terminos')?.addEventListener('change', function () {
            limpiarError('terminos');
        });
    }
});
