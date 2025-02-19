let usuarios = [];

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
    if(usuarios.find(usuario => usuario.email == data.email)){
        alert("Esté e-mail já está cadastrado");
        return;

    } 
    fetch("http://localhost:8000/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data) 
    })
    .then(resposta => resposta.json())
    .then(resposta => {alert("Usuário cadastrado com sucesso")
    })
}

async function buscarUsuarios(){
    try {
    let request = await fetch("http://localhost:8000/usuarios")
    let resposta = await request.json()
    if (resposta){
        usuarios = resposta;
        listarUsuarios(resposta)
    }
    } catch (error) {
        alert(`Falha ao buscar dados: ${error.message}`)
    }
}
buscarUsuarios()

function mostrarSideBarEditar(id) {
    let modalBG = document.querySelector("#sidebarEditar");
    modalBG.classList.remove("-right-full");
    modalBG.classList.add("right-0");
    let usuario = usuarios.find(usuario => usuario.id == id);
    let idValue = document.querySelector("#idEditar");
    let nomeValue = document.querySelector("#nomeEditar");
    let emailValue = document.querySelector("#emailEditar");
    idValue.value = usuario.id;
    nomeValue.value = usuario.nome;
    emailValue.value = usuario.email;
    mostrarOverlay()
}
function ocultarSideBarEditar() {
    let modalBG = document.querySelector("#sidebarEditar");
    modalBG.classList.remove("right-0");
    modalBG.classList.add("-right-full");
}

function editarUsuario(){
    let formulario = document.querySelector("#editar");
    let formData = new FormData(formulario);
    let data = Object.fromEntries(formData.entries());
    fetch(`http://localhost:8000/usuarios/${data.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(resposta => resposta.json())
    .then(resposta => {console.log(resposta);
    });

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
                <td class="w-auto">${usuario.email}</td>
                <td class="w-[100px] flex gap-3">
                    <button onclick="mostrarSideBarEditar(${usuario.id})" class="w-[36px] h-[36px] p-2 flex justify-center items-center bg-verde-claro rounded-full hover:bg-verde-escuro group duration-200">
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

