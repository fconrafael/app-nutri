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

function adicionarUsuario() {
    event.preventDefault();

    // let nome = document.getElementById("nome").value;
    // let email = document.getElementById("email").value;

    let formulario = document.querySelector("#criar");
    let formData = new FormData(formulario);
    let data = {};
    for(const pair of formData.entries()){
        data[pair[0]] = pair[1]
    }

    fetch("http://localhost:8000/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: data
    })
    .then(resposta => resposta.json())
    .then(resposta => {dados = resposta});
}

function buscarUsuarios(){
    // requisição do tipo GET pra buscar os usuarios
}

function editarUsuario(){
    // requisição do tipo PUT pra buscar os usuarios
}

function deletarUsuario(id){
    // requisição do tipo DELETE pra apagar o usuario
}

function listarUsuarios(usuarios){
    let table = document.querySelector("#usuarios");
    usuarios.map(usuario => {
        table.innerHTML += `
            <tr>
                <td class="w-[50px]">${usuario.id}</td>
                <td class="w-[250px]">${usuario.nome}</td>
                <td class="w-full">${usuario.email}</td>
                <td class="w-[100px] flex gap-3">
                    <button class="w-[36px] h-[36px] p-2 flex justify-center items-center bg-verde-claro rounded-full hover:bg-verde-escuro group duration-200">
                        <box-icon type='solid' name='pencil' class="fill-verde-escuro group-hover:fill-verde-claro"></box-icon>
                    </button>
                    <button class="w-[36px] h-[36px] p-2 flex justify-center items-center bg-verde-claro rounded-full hover:bg-verde-escuro group duration-200">
                        <box-icon type='solid' name='trash' class="fill-verde-escuro group-hover:fill-verde-claro"></box-icon>
                    </button>
                </td>
            </tr>
        `
    })
}

