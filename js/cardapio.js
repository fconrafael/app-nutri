function mostrarDetalhes(){
    let detalhes = document.querySelector("#sidebar");
    let modalBG = document.querySelector("#overlay");
    detalhes.classList.remove("-right-full");
    detalhes.classList.add("right-0");
    modalBG.classList.remove("invisible", "opacity-0")
}

function ocultarDetalhes(){
    let detalhes = document.querySelector("#sidebar");
    detalhes.classList.remove("right-0");
    detalhes.classList.add("-right-full");
}

function ocultarOverlay() {
    let modalBG = document.querySelector("#overlay");
    modalBG.classList.add("invisible", "opacity-0");
    ocultarDetalhes()
}