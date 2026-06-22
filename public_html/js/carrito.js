// ============================================
// CARRITO DE COMPRAS
// ============================================

let productoActual = null;
let cantidad = 1;
let total = 0;

// Obtener carrito guardado
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

// Guardar carrito
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


function toggleMenu() {
    const menu = document.getElementById("navMenu");
    if (menu)
        menu.classList.toggle("mostrar");
}

// Agregar producto
function agregarAlCarrito(producto) {

    let carrito = obtenerCarrito();

    carrito.push(producto);

    guardarCarrito(carrito);

    actualizarContadorCarrito();
}

// Eliminar producto
function eliminarProducto(indice) {

    let carrito = obtenerCarrito();

    carrito.splice(indice, 1);

    guardarCarrito(carrito);

    mostrarCarrito();
    actualizarContadorCarrito();
}

// Vaciar carrito
function vaciarCarrito() {

    localStorage.removeItem("carrito");

    actualizarContadorCarrito();
}

// Actualizar contador del navbar
function actualizarContadorCarrito() {

    const carrito = obtenerCarrito();

    let totalProductos = 0;

    carrito.forEach(producto => {
        totalProductos += producto.cantidad || 1;
    });

    const contador = document.getElementById("contadorCarrito");

    if (contador) {
        contador.textContent = totalProductos;
    }
}

// Calcular total general
function calcularTotalCarrito() {

    const carrito = obtenerCarrito();

    let total = 0;

    carrito.forEach(producto => {
        total += Number(producto.total || 0);
    });

    return total;
}



// Mostrar carrito en carrito.html
function mostrarCarrito() {

    const contenedor = document.getElementById("contenedorCarrito");

    if (!contenedor)
        return;

    const carrito = obtenerCarrito();

    if (carrito.length === 0) {

        contenedor.innerHTML = `
            <div class="carrito-vacio">
                <h2>🛒 Tu carrito está vacío</h2>
                <a href="index.html#Productos" class="btn-detalle">
                    Ver productos
                </a>
            </div>
        `;

        return;
    }

    let html = "";

    carrito.forEach((producto, indice) => {

        html += `
            <div class="item-carrito">

                <div class="item-img">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                </div>

                <div class="item-info">
                    <h3>${producto.nombre}</h3>

                    <p>
                        Cantidad: ${producto.cantidad}
                    </p>

                    <p>
                        Precio: S/ ${(Number(producto.total || 0)).toFixed(2)}
                    </p>

                    <button
                        onclick="eliminarProducto(${indice})"
                        class="btn-eliminar">
                        Eliminar
                    </button>
                </div>

            </div>
        `;
    });

    html += `
        <div class="total-carrito">
            <h2>Total: S/ ${(Number(calcularTotalCarrito() || 0)).toFixed(2)}</h2>

            <div class="carrito-botones">

    <button
        onclick="window.location.href='index.html#Productos'"
        class="btn-detalle">

        Seguir comprando
    </button>

    <button
        onclick="finalizarCompra()"
        class="btn-agregar-carrito">

        Finalizar compra
    </button>

</div>
        </div>
    `;

    contenedor.innerHTML = html;
}

// Finalizar compra
function finalizarCompra() {

    alert("🎉 Gracias por tu compra");

    localStorage.removeItem("carrito");

    window.location.href = "index.html";
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {

    actualizarContadorCarrito();

    if (document.getElementById("contenedorCarrito")) {
        mostrarCarrito();
    }

});

function cambiarCantidad(valor) {

    cantidad += valor;

    if (cantidad < 1)
        cantidad = 1;
    

    document.getElementById("cantidad").textContent = cantidad;

    actualizarPrecio();
}


let opcionesSeleccionadas = {
    tamano: 0,
    extras: [],
    salsas: []
};

function iniciarConfigurador(producto) {

    productoActual = producto;
    total = producto.precio;
    cantidad = 1;
    opcionesSeleccionadas = {
        tamano: 0,
        extras: [],
        salsas: [],
        cremas: [],
        porciones: [],
        temperatura: []
    };

    // =========================
    // RENDER OPCIONES
    // =========================
    const contenedor = document.getElementById("configOpciones");

    let html = "";

    // ===== TAMAÑOS =====
    if (producto.configuracion?.tamanos) {
        html += `<h3>Tamaño</h3>`;

        producto.configuracion.tamanos.forEach((t, index) => {
            html += `
                <label>
                    <input type="radio" name="tamano" value="${t.extra}"
                    ${index === 0 ? "checked" : ""}>
                    ${t.nombre} ${t.extra > 0 ? `( + S/${t.extra.toFixed(2)} )` : ""}
                </label>
            `;
        });
    }

    // ===== PORCIONES (COMPLEMENTOS / NUGGETS) =====
    if (producto.configuracion?.porciones) {
        html += `<h3>Porción</h3>`;

        producto.configuracion.porciones.forEach((p, index) => {
            html += `
                <label>
                    <input type="radio" name="porcion" value="${p.precio}"
                    ${index === 0 ? "checked" : ""}>
                    ${p.nombre} ${p.precio > 0 ? `( + S/${p.precio.toFixed(2)} )` : ""}
                </label>
            `;
        });
    }

    // ===== EXTRAS =====
    if (producto.configuracion?.extras) {
        html += `<hr><h3>Ingredientes extra</h3>`;

        producto.configuracion.extras.forEach((e) => {
            html += `
                <label>
                    <input type="checkbox" class="extra" value="${e.extra}">
                    ${e.nombre} (+ S/${e.extra.toFixed(2)})
                </label>
            `;
        });
    }


    // ===== SALSAS =====
    if (producto.configuracion?.salsas) {
        html += `<hr><h3>Salsas</h3>`;

        producto.configuracion.salsas.forEach((s) => {

            const nombre = (typeof s === "object") ? s.nombre : s;

            html += `
        <label>
            <input type="checkbox" class="salsa">
            ${nombre}
        </label>
    `;
        });
    }

    // ===== TEMPERATURA (GASEOSAS) =====
    if (producto.configuracion?.temperatura) {
        html += `<hr><h3>Temperatura</h3>`;

        producto.configuracion.temperatura.forEach((t, index) => {
            html += `
                <label>
                    <input type="radio" name="temperatura" value="${t.nombre}"
                    ${index === 0 ? "checked" : ""}>
                    ${t.nombre}
                </label>
            `;
        });
    }

    // ===== CANTIDAD =====
    html += `
    <hr>
    <h3>Cantidad</h3>

    <div class="cantidad-control">

        <button class="btn-menos" onclick="cambiarCantidad(-1)">-</button>

        <span id="cantidad" class="cantidad-numero">
            ${cantidad}
        </span>

        <button class="btn-mas" onclick="cambiarCantidad(1)">+</button>

    </div>

    <br><br>
`;

    contenedor.innerHTML = html;

    // =========================
    // BOTÓN AGREGAR
    // =========================
    document.getElementById("configAcciones").innerHTML = `
        <button onclick="agregarConfigurado(${producto.id})"
        class="btn-agregar-carrito">
            🛒 Agregar al carrito
        </button>
    `;

    // =========================
    // EVENTOS PARA PRECIO
    // =========================
    document.querySelectorAll('input[name="tamano"]').forEach(radio => {
        radio.addEventListener("change", actualizarPrecio);
    });

    document.querySelectorAll(".extra").forEach(cb => {
        cb.addEventListener("change", actualizarPrecio);
    });

    document.querySelectorAll(".crema").forEach(cb => {
        cb.addEventListener("change", actualizarPrecio);
    });

    document.querySelectorAll(".salsa").forEach(cb => {
        cb.addEventListener("change", actualizarPrecio);
    });

    document.querySelectorAll('input[name="porcion"]').forEach(radio => {
        radio.addEventListener("change", actualizarPrecio);
    });

    document.querySelectorAll('input[name="temperatura"]').forEach(radio => {
        radio.addEventListener("change", actualizarPrecio);
    });

    actualizarPrecio();
}


function actualizarPrecio() {

    let base = parseFloat(productoActual.precio);
    let extraTamano = 0;
    let extras = 0;

    const tamano = document.querySelector('input[name="tamano"]:checked');
    if (tamano) {
        extraTamano = parseFloat(tamano.value);
    }

    document.querySelectorAll(".extra:checked").forEach(el => {
        extras += parseFloat(el.value);
    });

    // 👉 PRECIO UNITARIO REAL (sin cantidad)
    let precioUnitario = base + extraTamano + extras;

    // 👉 TOTAL FINAL
    total = precioUnitario * cantidad;

    document.getElementById("precioFinal").textContent =
            total.toFixed(2);
}

function agregarConfigurado(id) {

    const productoSeleccionado = productoActual;

    const item = {
        id: productoSeleccionado.id,
        nombre: productoSeleccionado.nombre,
        imagen: productoSeleccionado.imagen,
        cantidad: cantidad,
        precioUnitario: total / cantidad,
        total: total
    };

    // =========================
    // GUARDAR EN CARRITO
    // =========================
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.push(item);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    // =========================
    // MENSAJE
    // =========================
    alert("Producto agregado al carrito");

    // =========================
    // REDIRECCIÓN
    // =========================
    window.location.href = "../carrito.html";
}
