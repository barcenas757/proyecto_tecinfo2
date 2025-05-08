// Función para mostrar la imagen en tamaño completo al hacer clic
function mostrarImagen(imagenElement) {
    var modal = document.getElementById("modal");
    var imagenModal = document.getElementById("imagen-modal");
    
    // Cambiar la fuente de la imagen modal a la fuente de la imagen seleccionada
    imagenModal.src = imagenElement.querySelector("img").src;
    
    // Mostrar el modal
    modal.style.display = "flex";
}

// Función para cerrar el modal cuando se haga clic en cualquier lugar fuera de la imagen
function cerrarModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
}
