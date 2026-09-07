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
                errores.push("El campo de nombre está vacío. <strong>Sugerencia:</strong> Ingresa tu nombre y apellido para poder identificar tu solicitud.");
            } else if (nombre.length < 3) {
                errores.push("El nombre es muy corto. <strong>Sugerencia:</strong> Ingresa un nombre válido de al menos 3 caracteres.");
            }

            if (email === "") {
                errores.push("Falta el correo electrónico. <strong>Sugerencia:</strong> Necesitamos tu correo para poder responderte.");
            } else if (!email.includes("@") || !email.includes(".")) {
                errores.push("El formato del correo es inválido. <strong>Sugerencia:</strong> Asegúrate de incluir el símbolo '@' y un dominio (ejemplo: usuario@correo.com).");
            }

            if (asunto === "") {
                errores.push("No has seleccionado un motivo. <strong>Sugerencia:</strong> Elige una opción en la lista desplegable de 'Asunto'.");
            }

            if (mensaje === "") {
                errores.push("El mensaje está vacío. <strong>Sugerencia:</strong> Escríbenos el detalle de tu consulta.");
            } else if (mensaje.length < 10) {
                errores.push("El mensaje es muy breve. <strong>Sugerencia:</strong> Por favor, detalla un poco más tu consulta (mínimo 10 caracteres).");
            }

            if (errores.length > 0) {
                evento.preventDefault(); 
                
                let htmlErrores = "<strong>Se encontraron los siguientes errores:</strong><ul>";
                errores.forEach(function(error) {
                    htmlErrores += "<li>" + error + "</li>";
                });
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
});

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

const iconosCarrito = document.querySelectorAll(".cart-btn");
iconosCarrito.forEach(function(icono) {
    icono.addEventListener("click", function() {
        window.location.href = "carrito.html";
    });
});

const botonesCatalogo = document.querySelectorAll(".btn-agregar");

if (botonesCatalogo.length > 0) {
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