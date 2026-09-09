document.addEventListener("DOMContentLoaded", function() {
    
    const formulario = document.getElementById("formulario-contacto");
    const cajaErrores = document.getElementById("caja-errores");

    if (formulario) {
        formulario.addEventListener("submit", function(evento) {
            let errores = [];
            cajaErrores.innerHTML = ""; 

            const nombre = document.getElementById("nombre").value.trim();
            const email = document.getElementById("email").value.trim();
            const asunto = document.getElementById("asunto").value;
            const mensaje = document.getElementById("mensaje").value.trim();

            if (nombre === "") {
                errores.push("El campo de nombre está vacío.");
            }
            if (email === "" || !email.includes("@")) {
                errores.push("Correo electrónico inválido.");
            }
            if (asunto === "") {
                errores.push("Selecciona un asunto.");
            }
            if (mensaje === "") {
                errores.push("El mensaje está vacío.");
            }

            if (errores.length > 0) {
                evento.preventDefault();
                let htmlErrores = "<ul>";
                errores.forEach(err => htmlErrores += `<li>${err}</li>`);
                htmlErrores += "</ul>";
                cajaErrores.innerHTML = htmlErrores;
                cajaErrores.classList.remove("oculto");
            }
        });
    }

    const selectorColor = document.getElementById("color");
    const imagenPrincipal = document.getElementById("imagen-principal");

    if (selectorColor && imagenPrincipal) {
        selectorColor.addEventListener("change", function() {
            const colorSeleccionado = selectorColor.value; 
            const tipoProducto = selectorColor.getAttribute("data-producto");
            imagenPrincipal.src = "assets/img/" + tipoProducto + "-" + colorSeleccionado + ".jpg";
        });
    }

    const btnAgregar = document.querySelector(".btn-agregar-grande");
    if (btnAgregar) {
        btnAgregar.addEventListener("click", function() {
            const tituloProducto = document.querySelector(".info-detalle h2").textContent;
            const precioProducto = document.querySelector(".precio-detalle").textContent;
            const selectColor = document.getElementById("color");
            let detalleColor = selectColor ? selectColor.value : "Estándar";

            const producto = {
                titulo: tituloProducto,
                detalle: "Color: " + detalleColor,
                precio: precioProducto
            };

            let carrito = JSON.parse(localStorage.getItem("carritoHeartz")) || [];
            carrito.push(producto);
            localStorage.setItem("carritoHeartz", JSON.stringify(carrito));

            alert("¡Producto añadido al carrito con éxito!");
        });
    }

    const listaCarrito = document.getElementById("lista-carrito");
    const totalPrecio = document.getElementById("total-precio");
    const btnVaciar = document.getElementById("vaciar-carrito");
    const btnComprar = document.getElementById("procesar-compra");

    if (listaCarrito) {
        function mostrarCarrito() {
            let carrito = JSON.parse(localStorage.getItem("carritoHeartz")) || [];
            listaCarrito.innerHTML = "";
            let sumaTotal = 0;

            if (carrito.length === 0) {
                listaCarrito.innerHTML = "<tr><td colspan='4' style='text-align: center; color: #777;'>Tu carrito está vacío</td></tr>";
                totalPrecio.textContent = "$0";
                return;
            }

            carrito.forEach(function(item, index) {
                let precioNumerico = parseInt(item.precio.replace("$", "").replace(/\./g, ""));
                sumaTotal += precioNumerico;

                let fila = document.createElement("tr");
                fila.innerHTML = `
                    <td><strong>${item.titulo}</strong></td>
                    <td>${item.detalle}</td>
                    <td>${item.precio}</td>
                    <td><button class="btn-eliminar" onclick="eliminarProducto(${index})">Eliminar</button></td>
                `;
                listaCarrito.appendChild(fila);
            });

            totalPrecio.textContent = "$" + sumaTotal.toLocaleString("es-CL");
        }

        window.eliminarProducto = function(index) {
            let carrito = JSON.parse(localStorage.getItem("carritoHeartz")) || [];
            carrito.splice(index, 1);
            localStorage.setItem("carritoHeartz", JSON.stringify(carrito));
            mostrarCarrito();
        };

        if (btnVaciar) {
            btnVaciar.addEventListener("click", function() {
                localStorage.removeItem("carritoHeartz");
                mostrarCarrito();
            });
        }

        if (btnComprar) {
            btnComprar.addEventListener("click", function() {
                let carrito = JSON.parse(localStorage.getItem("carritoHeartz")) || [];
                if (carrito.length === 0) {
                    alert("Tu carrito está vacío.");
                } else {
                    alert("¡Compra realizada con éxito! Gracias por elegir Heartz Tools.");
                    localStorage.removeItem("carritoHeartz");
                    mostrarCarrito();
                }
            });
        }

        mostrarCarrito();
    }

    if (!localStorage.getItem("productosHeartz")) {
        const productosIniciales = [
            { titulo: "Guitarra Casual", precio: "$350.000", imagen: "guitarra-negro.jpg", link: "detalle-guitarra.html" },
            { titulo: "Batería Acústica 5 piezas", precio: "$520.000", imagen: "bateria-azul.jpg", link: "detalle-bateria.html" },
            { titulo: "Auriculares Audio-Technica M50x", precio: "$140.000", imagen: "auriculares-negro.jpg", link: "detalle-auriculares.html" },
            { titulo: "Acordeón Profesional", precio: "$1.200.000", imagen: "acordeon-rojo.jpg", link: "detalle-acordeon.html" }
        ];
        localStorage.setItem("productosHeartz", JSON.stringify(productosIniciales));
    }

    const formRegistro = document.getElementById("form-registro");
    if (formRegistro) {
        formRegistro.addEventListener("submit", function(evento) {
            evento.preventDefault();
            const nombre = document.getElementById("nombre-reg").value.trim();
            const email = document.getElementById("email-reg").value.trim();
            const password = document.getElementById("password-reg").value;

            let usuarios = JSON.parse(localStorage.getItem("usuariosHeartz")) || [];
            const existe = usuarios.some(u => u.email === email);

            if (existe) {
                alert("Este correo electrónico ya se encuentra registrado.");
                return;
            }

            usuarios.push({ nombre: nombre, email: email, password: password });
            localStorage.setItem("usuariosHeartz", JSON.stringify(usuarios));
            alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
            window.location.href = "login.html";
        });
    }

    const formLogin = document.getElementById("form-login");
    if (formLogin) {
        formLogin.addEventListener("submit", function(evento) {
            evento.preventDefault();
            const email = document.getElementById("email-login").value.trim();
            const password = document.getElementById("password-login").value;

            if (email === "admin@heartztools.cl" && password === "admin123") {
                const adminUser = { nombre: "Administrador", email: email, rol: "admin" };
                localStorage.setItem("sesionActiva", JSON.stringify(adminUser));
                alert("¡Bienvenido al Panel de Administración!");
                window.location.href = "admin.html";
                return;
            }

            let usuarios = JSON.parse(localStorage.getItem("usuariosHeartz")) || [];
            const usuarioEncontrado = usuarios.find(u => u.email === email && u.password === password);

            if (usuarioEncontrado) {
                localStorage.setItem("sesionActiva", JSON.stringify(usuarioEncontrado));
                alert("¡Bienvenido de vuelta, " + usuarioEncontrado.nombre + "!");
                window.location.href = "index.html";
            } else {
                alert("Correo o contraseña incorrectos.");
            }
        });
    }

    if (window.location.pathname.includes("admin.html")) {
        const sesion = JSON.parse(localStorage.getItem("sesionActiva"));
        if (!sesion || sesion.rol !== "admin") {
            alert("Acceso denegado. Debes iniciar sesión como administrador.");
            window.location.href = "login.html";
        }
    }

    const btnCerrarAdmin = document.getElementById("btn-cerrar-sesion-admin");
    if (btnCerrarAdmin) {
        btnCerrarAdmin.addEventListener("click", function(e) {
            e.preventDefault();
            localStorage.removeItem("sesionActiva");
            window.location.href = "login.html";
        });
    }

    const formCrearProducto = document.getElementById("form-crear-producto");
    if (formCrearProducto) {
        formCrearProducto.addEventListener("submit", function(e) {
            e.preventDefault();
            const titulo = document.getElementById("admin-titulo").value.trim();
            const precio = document.getElementById("admin-precio").value.trim();
            const imagen = document.getElementById("admin-imagen").value.trim();

            let productos = JSON.parse(localStorage.getItem("productosHeartz")) || [];
            productos.push({ titulo: titulo, precio: precio, imagen: imagen, link: "#" });
            localStorage.setItem("productosHeartz", JSON.stringify(productos));

            alert("¡Producto agregado con éxito al catálogo!");
            document.getElementById("admin-titulo").value = "";
            document.getElementById("admin-precio").value = "";
            document.getElementById("admin-imagen").value = "";
            cargarAdminProductos();
        });
    }

    const adminListaProductos = document.getElementById("admin-lista-productos");
    function cargarAdminProductos() {
        if (!adminListaProductos) return;
        let productos = JSON.parse(localStorage.getItem("productosHeartz")) || [];
        adminListaProductos.innerHTML = "";

        if (productos.length === 0) {
            adminListaProductos.innerHTML = "<tr><td colspan='3' style='text-align: center;'>No hay productos registrados</td></tr>";
            return;
        }

        productos.forEach(function(prod, index) {
            let fila = document.createElement("tr");
            fila.innerHTML = `
                <td><strong>${prod.titulo}</strong></td>
                <td>${prod.precio}</td>
                <td><button class="btn-eliminar" onclick="eliminarProductoAdmin(${index})">Eliminar</button></td>
            `;
            adminListaProductos.appendChild(fila);
        });
    }

    window.eliminarProductoAdmin = function(index) {
        let productos = JSON.parse(localStorage.getItem("productosHeartz")) || [];
        productos.splice(index, 1);
        localStorage.setItem("productosHeartz", JSON.stringify(productos));
        cargarAdminProductos();
    };

    cargarAdminProductos();

    const gridCatalogo = document.getElementById("grid-catalogo");
    if (gridCatalogo) {
        let productos = JSON.parse(localStorage.getItem("productosHeartz")) || [];
        gridCatalogo.innerHTML = "";

        productos.forEach(function(prod) {
            let tarjeta = document.createElement("article");
            tarjeta.className = "tarjeta-producto";
            tarjeta.innerHTML = `
                <a href="${prod.link}">
                    <img src="assets/img/${prod.imagen}" alt="${prod.titulo}">
                </a>
                <div class="info-producto">
                    <h3><a href="${prod.link}" style="text-decoration: none; color: inherit;">${prod.titulo}</a></h3>
                    <p class="precio">${prod.precio}</p>
                    <button class="btn-agregar" data-nombre="${prod.titulo}" data-precio="${prod.precio}">Agregar al carrito</button>
                </div>
            `;
            gridCatalogo.appendChild(tarjeta);
        });

        const botonesCatalogo = document.querySelectorAll(".btn-agregar");
        botonesCatalogo.forEach(function(boton) {
            boton.addEventListener("click", function() {
                const nombre = boton.getAttribute("data-nombre");
                const precio = boton.getAttribute("data-precio");

                const producto = {
                    titulo: nombre,
                    detalle: "Versión Estándar",
                    precio: precio
                };

                let carrito = JSON.parse(localStorage.getItem("carritoHeartz")) || [];
                carrito.push(producto);
                localStorage.setItem("carritoHeartz", JSON.stringify(carrito));

                alert("¡" + nombre + " agregado al carrito con éxito!");
            });
        });
    }

});