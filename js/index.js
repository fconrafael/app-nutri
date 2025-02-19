function mostrarOverlay() {
    let modalBG = document.querySelector("#overlay");
    modalBG.classList.remove("invisible", "opacity-0");
}

function ocultarOverlay() {
    let modalBG = document.querySelector("#overlay");
    modalBG.classList.add("invisible", "opacity-0");
    ocultarSideBar()
    ocultarSideBarEditar()
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

// function adicionarUsuario() {
//     event.preventDefault();
//     let formulario = document.querySelector("#criar");
//     let formData = new FormData(formulario);
//     let data = {};
//     for(const pair of formData.entries()){
//         data[pair[0]] = pair[1]
//     }
//     fetch("http://localhost:8000/usuarios", {
//         method: "POST",
//         headers: {
//             "Content-Type": "multipart/form-data"
//         },
//         body: data
//     })
//     .then(resposta => resposta.json())
//     .then(resposta => {
//         dados = resposta
//     });
// }

function adicionarUsuario(event) {
    event.preventDefault();
    let formulario = document.querySelector("#criar");
    let formData = new FormData(formulario);
    let data = Object.fromEntries(formData.entries()); //converter um objeto FormData para um objeto // formData.entries() retorna um iterador contendo os pares chave-valor // Object.fromEntries() converte em um objeto
    // let data = {};
    // formData.forEach((value, key) => {  //converte em um objeto, pois náo pode ser diretametno transformado em JSON
    //     data[key] = value;
    // });

    fetch("http://localhost:8000/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data) // enviar os dados corretamente na requisição POST
    })
    .then(resposta => resposta.json())
    .then(resposta => {alert("Usuário cadastrado com sucesso")
    })
}

function buscarUsuarios(){
    fetch("http://localhost:8000/usuarios")
    .then(resposta => resposta.json())
    .then(resposta => {listarUsuarios(resposta)});
}
buscarUsuarios()

function mostrarSideBarEditar() {
    let modalBG = document.querySelector("#sidebarEditar");
    modalBG.classList.remove("-right-full");
    modalBG.classList.add("right-0");
    mostrarOverlay()
}
function ocultarSideBarEditar() {
    let modalBG = document.querySelector("#sidebarEditar");
    modalBG.classList.remove("right-0");
    modalBG.classList.add("-right-full");
}

function editarUsuario(id){
    fetch(`http://localhost:8000/usuarios/${id}`)
    .then(resposta => resposta.json())
    .then(resposta => {console.log(resposta);
    });

    document.getElementById("nomeEditar").value = resposta.nome;
    document.getElementById("emailEditar").value = resposta.email;

}

function deletarUsuario(id){
    let confirma = confirm("Tem certeza que deseja excluir o usuário");
    if (confirma)
    fetch(`http://localhost:8000/usuarios/${id}`, {
        method: "DELETE",
    })
    .then(resposta => resposta.json())
    .then(resposta => {alert("Usuário deletado com sucesso")});
    else {
        alert("Usuário não deletado");
        return(listarUsuarios());
    }
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
                    <button onclick="editarUsuario('2')" class="w-[36px] h-[36px] p-2 flex justify-center items-center bg-verde-claro rounded-full hover:bg-verde-escuro group duration-200">
                        <box-icon type='solid' name='pencil' class="fill-verde-escuro group-hover:fill-verde-claro"></box-icon>
                    </button>
                    <button onclick="deletarUsuario(${usuario.id})" class="w-[36px] h-[36px] p-2 flex justify-center items-center bg-verde-claro rounded-full hover:bg-verde-escuro group duration-200">
                        <box-icon type='solid' name='trash' class="fill-verde-escuro group-hover:fill-verde-claro"></box-icon>
                    </button>
                </td>
            </tr>
        `
    })
}

