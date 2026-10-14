const formulario = document.querySelector(".formulario-contacto");
const mensajeFormulario = document.getElementById("mensaje-formulario");

// Expresiones validación
const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]{2,50}$/;
const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    // Validar nombre
    if (!regexNombre.test(nombre)) {
        mensajeFormulario.textContent =
            "Ingresa un nombre válido.";
        mensajeFormulario.style.color = "#f53b4a";
        return;
    }

    // Validar correo
    if (!regexCorreo.test(correo)) {
        mensajeFormulario.textContent =
            "Ingresa un correo electrónico válido.";
        mensajeFormulario.style.color = "#f53b4a";
        return;
    }

    // Validar mensaje
    if (mensaje.length < 10) {
        mensajeFormulario.textContent =
            "El mensaje debe tener al menos 10 caracteres.";
        mensajeFormulario.style.color = "#f53b4a";
        return;
    }


    const formData = new FormData(formulario);

    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success){
            mensajeFormulario.textContent =
        `¡Gracias ${nombre}! Tu mensaje fue enviado correctamente.`;
            mensajeFormulario.style.color = "#0fcac1";
        formulario.reset();
        } else {
            mensajeFormulario.textContent =
        "Hubo un error al enviar su mensaje";
            mensajeFormulario.style.color = "#f53b4a";
        }
    })
    .catch(error => {
            mensajeFormulario.textContent =
            "Error de conexión, Intentalo de nuevo..";
            mensajeFormulario.style.color = "#f53b4a";
    })
});