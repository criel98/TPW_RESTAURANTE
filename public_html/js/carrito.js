// ============================================
// CARRITO DE COMPRAS - VERSIÓN CORREGIDA Y ROBUSTA
// ============================================

let productoActual = null;
let cantidad = 1;
let total = 0;

// ============================================
// FUNCIONES DE LOCAL STORAGE
// ============================================

function obtenerCarrito() {
    try {
        const data = localStorage.getItem("carrito");
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error al obtener carrito:", error);
        return [];
    }
}

function guardarCarrito(carrito) {
    try {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    } catch (error) {
        console.error("Error al guardar carrito:", error);
        alert("Error al guardar el carrito. Por favor, intenta de nuevo.");
    }
}

// ============================================
// FUNCIONES DE NAVEGACIÓN Y MENÚ
// ============================================

function toggleMenu() {
    const menu = document.getElementById("navMenu");
    if (menu) {
        menu.classList.toggle("mostrar");
    }
}

// ============================================
// FUNCIONES DEL CARRITO
// ============================================

function agregarAlCarrito(producto) {
    if (!producto || !producto.id) {
        console.error("Producto inválido:", producto);
        return;
    }

    let carrito = obtenerCarrito();
    
    // Validar que el producto tenga todos los campos necesarios
    const item = {
        id: producto.id,
        nombre: producto.nombre || "Producto sin nombre",
        imagen: producto.imagen || "",
        cantidad: producto.cantidad || 1,
        precioUnitario: producto.precioUnitario || producto.precio || 0,
        total: producto.total || (producto.precioUnitario || producto.precio || 0) * (producto.cantidad || 1)
    };
    
    carrito.push(item);
    guardarCarrito(carrito);
    actualizarContadorCarrito();
}

function eliminarProducto(indice) {
    let carrito = obtenerCarrito();
    
    if (indice >= 0 && indice < carrito.length) {
        carrito.splice(indice, 1);
        guardarCarrito(carrito);
        mostrarCarrito();
        actualizarContadorCarrito();
    } else {
        console.error("Índice inválido:", indice);
    }
}

function vaciarCarrito() {
    if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
        localStorage.removeItem("carrito");
        actualizarContadorCarrito();
        mostrarCarrito();
    }
}

// ============================================
// FUNCIONES DE CONTADOR Y CÁLCULOS
// ============================================

function actualizarContadorCarrito() {
    const carrito = obtenerCarrito();
    let totalProductos = 0;
    
    carrito.forEach(producto => {
        totalProductos += Number(producto.cantidad) || 1;
    });
    
    const contador = document.getElementById("contadorCarrito");
    if (contador) {
        contador.textContent = totalProductos;
        
        // Mostrar/ocultar contador según si hay productos
        if (totalProductos > 0) {
            contador.style.display = "inline-block";
        } else {
            contador.style.display = "none";
        }
    }
}

function calcularTotalCarrito() {
    const carrito = obtenerCarrito();
    let total = 0;
    
    carrito.forEach(producto => {
        // Intentar obtener el total de diferentes formas
        if (producto.total && !isNaN(producto.total)) {
            total += Number(producto.total);
        } else if (producto.precioUnitario && producto.cantidad) {
            total += Number(producto.precioUnitario) * Number(producto.cantidad);
        } else if (producto.precio && producto.cantidad) {
            total += Number(producto.precio) * Number(producto.cantidad);
        } else if (producto.precio) {
            total += Number(producto.precio);
        }
    });
    
    return total;
}

// ============================================
// FUNCIÓN PARA MOSTRAR EL CARRITO
// ============================================

function mostrarCarrito() {
    const contenedor = document.getElementById("contenedorCarrito");
    if (!contenedor) return;

    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div class="carrito-vacio">
                <h2>🛒 Tu carrito está vacío</h2>
                <p>Explora nuestros productos y encuentra tu comida favorita</p>
                <a href="index.html#Productos" class="btn-detalle">
                    Ver productos
                </a>
            </div>
        `;
        return;
    }

    let html = '<div class="items-carrito">';
    
    carrito.forEach((producto, indice) => {
        // Calcular el precio unitario si no está disponible
        const precioUnitario = producto.precioUnitario || 
                              producto.precio || 
                              (producto.total / (producto.cantidad || 1)) || 
                              0;
        
        const totalItem = producto.total || (precioUnitario * (producto.cantidad || 1));
        
        html += `
            <div class="item-carrito" data-index="${indice}">
                <div class="item-img">
                    <img src="${producto.imagen || 'img/default-product.jpg'}" 
                         alt="${producto.nombre || 'Producto'}"
                         onerror="this.src='img/default-product.jpg'">
                </div>
                <div class="item-info">
                    <h3>${producto.nombre || 'Producto sin nombre'}</h3>
                    <p>Cantidad: ${producto.cantidad || 1}</p>
                    <p>Precio unitario: S/ ${precioUnitario.toFixed(2)}</p>
                    <p><strong>Subtotal: S/ ${totalItem.toFixed(2)}</strong></p>
                    <button onclick="eliminarProducto(${indice})" class="btn-eliminar">
                        🗑️ Eliminar
                    </button>
                </div>
            </div>
        `;
    });
    
    html += '</div>';

    // Botones de acción
    const totalGeneral = calcularTotalCarrito();
    html += `
        <div class="total-carrito">
            <h2>Total: S/ ${totalGeneral.toFixed(2)}</h2>
            <div class="carrito-botones">
                <button onclick="window.location.href='index.html#Productos'" 
                        class="btn-detalle">
                    Seguir comprando
                </button>
                <button onclick="vaciarCarrito()" 
                        class="btn-eliminar">
                    Vaciar carrito
                </button>
                <button onclick="finalizarCompra()" 
                        class="btn-agregar-carrito">
                    Finalizar compra
                </button>
            </div>
        </div>
    `;

    contenedor.innerHTML = html;
}

// ============================================
// FINALIZAR COMPRA - CORREGIDO Y ROBUSTO
// ============================================

function finalizarCompra() {
    const carrito = obtenerCarrito();
    
    if (carrito.length === 0) {
        alert("🛒 Tu carrito está vacío. Agrega productos antes de finalizar la compra.");
        return;
    }
    
    const total = calcularTotalCarrito();
    
    if (isNaN(total) || total <= 0) {
        alert("Error al calcular el total. Por favor, revisa tu carrito.");
        return;
    }
    
    // Crear mensaje detallado para WhatsApp
    let mensaje = "🛒 *NUEVO PEDIDO - EL BUEN SABOR*\n";
    mensaje += "═".repeat(30) + "\n\n";
    mensaje += "📋 *DETALLE DEL PEDIDO:*\n\n";
    
    carrito.forEach((producto, index) => {
        const nombre = producto.nombre || "Producto sin nombre";
        const cantidad = producto.cantidad || 1;
        const precioUnitario = producto.precioUnitario || 
                              producto.precio || 
                              (producto.total / cantidad) || 0;
        const subtotal = producto.total || (precioUnitario * cantidad);
        
        mensaje += `${index + 1}. ${cantidad}x ${nombre}\n`;
        mensaje += `   S/ ${precioUnitario.toFixed(2)} c/u → S/ ${subtotal.toFixed(2)}\n\n`;
    });
    
    mensaje += "─".repeat(30) + "\n";
    mensaje += `💰 *TOTAL: S/ ${total.toFixed(2)}*\n\n`;
    mensaje += "═".repeat(30) + "\n\n";
    mensaje += "📍 *DATOS DEL CLIENTE:*\n";
    mensaje += "Nombre: [Ingresa tu nombre]\n";
    mensaje += "Dirección: [Ingresa tu dirección]\n";
    mensaje += "Teléfono: [Ingresa tu teléfono]\n";
    mensaje += "Referencia: [Ingresa alguna referencia]\n\n";
    mensaje += "⏱️ Tiempo estimado de entrega: 45-60 min\n";
    mensaje += "💵 Forma de pago: Efectivo/Yape/Plin\n\n";
    mensaje += "¡Gracias por tu pedido! 🙏";
    
    const numeroWhatsApp = "51951403223";
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    
    // ✅ GUARDAR EL CARRITO EN UNA VARIABLE ANTES DE ABRIR WHATSAPP
    const carritoActual = [...carrito]; // Copia del carrito
    
    // Abrir WhatsApp
    window.open(url, '_blank');
    
    // ✅ Preguntar inmediatamente después de abrir WhatsApp
    setTimeout(() => {
        if (confirm("✅ ¡Pedido enviado a WhatsApp!\n\n¿Quieres vaciar el carrito ahora?")) {
            localStorage.removeItem("carrito");
            actualizarContadorCarrito();
            mostrarCarrito();
            alert("🛒 Carrito vaciado correctamente.");
        }
    }, 2000);
}

// ============================================
// CONFIGURADOR DE PRODUCTOS
// ============================================

function cambiarCantidad(valor) {
    cantidad += valor;
    if (cantidad < 1) cantidad = 1;
    
    const cantidadElement = document.getElementById("cantidad");
    if (cantidadElement) {
        cantidadElement.textContent = cantidad;
    }
    
    actualizarPrecio();
}

function iniciarConfigurador(producto) {
    if (!producto) {
        console.error("Producto no válido para configurar");
        return;
    }
    
    productoActual = producto;
    total = producto.precio || 0;
    cantidad = 1;
    
    opcionesSeleccionadas = {
        tamano: 0,
        extras: [],
        salsas: [],
        cremas: [],
        porciones: [],
        temperatura: []
    };

    // Renderizar opciones
    const contenedor = document.getElementById("configOpciones");
    if (!contenedor) return;

    let html = "";

    // ===== TAMAÑOS =====
    if (producto.configuracion?.tamanos && producto.configuracion.tamanos.length > 0) {
        html += `<h3>Tamaño</h3>`;
        producto.configuracion.tamanos.forEach((t, index) => {
            html += `
                <label class="opcion-radio">
                    <input type="radio" name="tamano" value="${t.extra || 0}" 
                           ${index === 0 ? "checked" : ""}>
                    ${t.nombre} ${t.extra > 0 ? `( + S/${t.extra.toFixed(2)} )` : ""}
                </label>
            `;
        });
    }

    // ===== PORCIONES =====
    if (producto.configuracion?.porciones && producto.configuracion.porciones.length > 0) {
        html += `<h3>Porción</h3>`;
        producto.configuracion.porciones.forEach((p, index) => {
            html += `
                <label class="opcion-radio">
                    <input type="radio" name="porcion" value="${p.precio || 0}"
                           ${index === 0 ? "checked" : ""}>
                    ${p.nombre} ${p.precio > 0 ? `( + S/${p.precio.toFixed(2)} )` : ""}
                </label>
            `;
        });
    }

    // ===== EXTRAS =====
    if (producto.configuracion?.extras && producto.configuracion.extras.length > 0) {
        html += `<hr><h3>Ingredientes extra</h3>`;
        producto.configuracion.extras.forEach((e) => {
            html += `
                <label class="opcion-checkbox">
                    <input type="checkbox" class="extra" value="${e.extra || 0}">
                    ${e.nombre} (+ S/${(e.extra || 0).toFixed(2)})
                </label>
            `;
        });
    }

    // ===== SALSAS =====
    if (producto.configuracion?.salsas && producto.configuracion.salsas.length > 0) {
        html += `<hr><h3>Salsas</h3>`;
        producto.configuracion.salsas.forEach((s) => {
            const nombre = typeof s === "object" ? s.nombre : s;
            html += `
                <label class="opcion-checkbox">
                    <input type="checkbox" class="salsa">
                    ${nombre}
                </label>
            `;
        });
    }

    // ===== TEMPERATURA =====
    if (producto.configuracion?.temperatura && producto.configuracion.temperatura.length > 0) {
        html += `<hr><h3>Temperatura</h3>`;
        producto.configuracion.temperatura.forEach((t, index) => {
            html += `
                <label class="opcion-radio">
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
            <span id="cantidad" class="cantidad-numero">${cantidad}</span>
            <button class="btn-mas" onclick="cambiarCantidad(1)">+</button>
        </div>
        <br><br>
    `;

    contenedor.innerHTML = html;

    // ===== BOTÓN AGREGAR =====
    const accionesDiv = document.getElementById("configAcciones");
    if (accionesDiv) {
        accionesDiv.innerHTML = `
            <button onclick="agregarConfigurado()" class="btn-agregar-carrito">
                🛒 Agregar al carrito
            </button>
        `;
    }

    // ===== EVENTOS PARA ACTUALIZAR PRECIO =====
    document.querySelectorAll('input[name="tamano"]').forEach(radio => {
        radio.addEventListener("change", actualizarPrecio);
    });

    document.querySelectorAll(".extra").forEach(cb => {
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
    if (!productoActual) return;
    
    let base = parseFloat(productoActual.precio) || 0;
    let extraTamano = 0;
    let extras = 0;

    const tamano = document.querySelector('input[name="tamano"]:checked');
    if (tamano) {
        extraTamano = parseFloat(tamano.value) || 0;
    }

    document.querySelectorAll(".extra:checked").forEach(el => {
        extras += parseFloat(el.value) || 0;
    });

    let precioUnitario = base + extraTamano + extras;
    total = precioUnitario * cantidad;

    const precioFinal = document.getElementById("precioFinal");
    if (precioFinal) {
        precioFinal.textContent = total.toFixed(2);
    }
}

function agregarConfigurado() {
    if (!productoActual) {
        alert("Error: No hay producto seleccionado");
        return;
    }
    
    const precioUnitario = total / cantidad;
    
    const item = {
        id: productoActual.id,
        nombre: productoActual.nombre || "Producto sin nombre",
        imagen: productoActual.imagen || "img/default-product.jpg",
        cantidad: cantidad,
        precioUnitario: precioUnitario,
        total: total
    };

    // Agregar al carrito
    let carrito = obtenerCarrito();
    carrito.push(item);
    guardarCarrito(carrito);
    
    // Actualizar contador
    actualizarContadorCarrito();
    
    // Mensaje de confirmación
    alert(`✅ Producto agregado al carrito\n\n${item.nombre}\nCantidad: ${item.cantidad}\nTotal: S/ ${item.total.toFixed(2)}`);
    
    // Redirigir al carrito
    window.location.href = "../carrito.html";
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();
    
    if (document.getElementById("contenedorCarrito")) {
        mostrarCarrito();
    }
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener("click", (e) => {
        const menu = document.getElementById("navMenu");
        const botonMenu = document.querySelector(".menu-toggle");
        if (menu && botonMenu && menu.classList.contains("mostrar")) {
            if (!menu.contains(e.target) && !botonMenu.contains(e.target)) {
                menu.classList.remove("mostrar");
            }
        }
    });
});

// ============================================
// FUNCIONES DE UTILIDAD ADICIONALES
// ============================================

// Función para obtener el número de items en el carrito
function getTotalItemsCarrito() {
    const carrito = obtenerCarrito();
    let total = 0;
    carrito.forEach(item => {
        total += parseInt(item.cantidad) || 1;
    });
    return total;
}

// Función para verificar si el carrito tiene productos
function carritoVacio() {
    return obtenerCarrito().length === 0;
}

// Función para actualizar el badge del carrito en tiempo real
function actualizarBadgeCarrito() {
    const badge = document.querySelector(".carrito-badge");
    if (badge) {
        const total = getTotalItemsCarrito();
        badge.textContent = total;
        badge.style.display = total > 0 ? "flex" : "none";
    }
}

// Exportar funciones para uso global
window.agregarAlCarrito = agregarAlCarrito;
window.eliminarProducto = eliminarProducto;
window.vaciarCarrito = vaciarCarrito;
window.finalizarCompra = finalizarCompra;
window.mostrarCarrito = mostrarCarrito;
window.actualizarContadorCarrito = actualizarContadorCarrito;
window.calcularTotalCarrito = calcularTotalCarrito;
window.iniciarConfigurador = iniciarConfigurador;
window.agregarConfigurado = agregarConfigurado;
window.cambiarCantidad = cambiarCantidad;
window.actualizarPrecio = actualizarPrecio;
window.toggleMenu = toggleMenu;
window.getTotalItemsCarrito = getTotalItemsCarrito;
window.carritoVacio = carritoVacio;
window.actualizarBadgeCarrito = actualizarBadgeCarrito;