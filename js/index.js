function mostrarOverlay() {
    let modalBG = document.querySelector("#overlay");
    modalBG.classList.remove("invisible", "opacity-0");
}

function ocultarOverlay() {
    let modalBG = document.querySelector("#overlay");
    modalBG.classList.add("invisible", "opacity-0");
    ocultarSideBar()
}

function mostrarSideBar() {
    let modalBG = document.querySelector("#sidebar");
    modalBG.classList.remove("-right-full");
    modalBG.classList.add("right-0");
    mostrarOverlay()
}

function ocultarSideBar() {
    let modalBG = document.querySelector("#sidebar");
    modalBG.classList.remove("right-0");
    modalBG.classList.add("-right-full");
}

function adicionarUsuario(event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;

    fetch("http://localhost:8000/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({nome, email})
    })
    .then(resposta => resposta.json())
    .then(resposta => {dados = resposta});
}

