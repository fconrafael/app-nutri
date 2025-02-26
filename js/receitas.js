let receitas = [];

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

function ocultarSideBarEditar() {
    let modalBG = document.querySelector("#sidebarEditar");
    modalBG.classList.remove("right-0");
    modalBG.classList.add("-right-full");
}

async function buscarReceitas(){
    try {
    let request = await fetch("http://localhost:8000/receitas")
    let resposta = await request.json()
    if (resposta){
        receitas = resposta;
        listarReceitas(resposta)
    }
    } catch (error) {
        alert(`Falha ao buscar dados: ${error.message}`)
    }
}
buscarReceitas()


function adicionarReceita(event) {
    event.preventDefault();
    let formulario = document.querySelector("#criar");
    let formData = new FormData(formulario);
    let data = Object.fromEntries(formData.entries());
    let inputs = document.querySelectorAll("#listaDeIngredientes input")
    data.ingredientes = [];
    inputs.forEach(input => data.ingredientes.push(input.value))
    
    if(receitas.find(receita => receita.titulo == data.ingredientes)){
        alert("Receita já está cadastrado");
        return;

    } 
    fetch("http://localhost:8000/receitas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data) 
    })
    .then(resposta => resposta.json())
    .then(resposta => {alert("Receita cadastrada com sucesso")
    })
}

function listarReceitas(receitas){
    let table = document.querySelector("#receitas");
    receitas.map(receita => {
        table.innerHTML += `
            <tr>
                <td class="w-[160px]">${receita.tituloReceita}</td>
                <td class="w-[400px]">${receita.ingredientes}</td>
                <td class="w-auto">${receita.modoPreparo}</td>
                <td class="w-[100px] flex gap-3">
                    <button onclick="mostrarSideBarEditar(${receita.id})" class="w-[36px] h-[36px] p-2 flex justify-center items-center bg-verde-claro rounded-full hover:bg-verde-escuro group duration-200">
                        <box-icon type='solid' name='pencil' class="fill-verde-escuro group-hover:fill-verde-claro"></box-icon>
                    </button>
                    <button onclick="deletarReceita(${receita.id})" class="w-[36px] h-[36px] p-2 flex justify-center items-center bg-verde-claro rounded-full hover:bg-verde-escuro group duration-200">
                        <box-icon type='solid' name='trash' class="fill-verde-escuro group-hover:fill-verde-claro"></box-icon>
                    </button>
                </td>
            </tr>
        `
    })
}


function editarReceita(){
    let formulario = document.querySelector("#editar");
    let formData = new FormData(formulario);
    let data = Object.fromEntries(formData.entries());
    fetch(`http://localhost:8000/receitas/${data.id}`, {
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

function mostrarSideBarEditar(id) {
    let modalBG = document.querySelector("#sidebarEditar");
    modalBG.classList.remove("-right-full");
    modalBG.classList.add("right-0");
    let receita = receitas.find(receita => receita.id == id);

    let idValue = document.querySelector("#idEditar");
    let tituloValue = document.querySelector("#tituloReceitaEditar");
    let ingredientesValue = document.querySelector("#listaDeIngredientesEditar");
    let modoPreparoValue = document.querySelector("#modoPreparoEditar");
    let tempoValue = document.querySelector("#tempoEditar");

    idValue.value = receita.id;
    tituloValue.value = receita.tituloReceita;
    modoPreparoValue.value = receita.modoPreparo;
    tempoValue.value = receita.tempo;

    ingredientesValue.innerHTML = '';
    receita.ingredientes.forEach(ingrediente => {
        let div = document.createElement('div');
        div.className = 'flex gap-3 mb-2';
    
        let input = document.createElement('input');
        input.type = 'text';
        input.name = 'ingredienteEditar';
        input.value = ingrediente;
        input.className = 'w-full h-[40px] rounded-[6px] border-2 border-stone-300 pl-[10px]';

    
        let botaoRemover = document.createElement('button');
        botaoRemover.type = 'button';
        botaoRemover.textContent = 'Remover';
        botaoRemover.className = 'bg-red-500 text-white px-3 py-1 rounded';
        botaoRemover.addEventListener('click', () => {
            ingredientesValue.removeChild(div);
        });
    
        div.appendChild(input);
        div.appendChild(botaoRemover);
        ingredientesValue.appendChild(div);
    });
    
      mostrarOverlay();
    }


function deletarReceita(id){
    let confirma = confirm("Tem certeza que deseja excluir a receita");
    if (confirma)
    fetch(`http://localhost:8000/receitas/${id}`, {
        method: "DELETE",
    })
    .then(resposta => resposta.json())
    .then(resposta => {alert("Receita deletada com sucesso")});
    else {
        alert("Receita não deletada");
        return(listarReceitas());
    }
}

function adicionarIngrediente (){
    let lista = document.querySelector("#listaDeIngredientes");
    let indice = document.querySelectorAll("#listaDeIngredientes > div").length
    let div = document.createElement("div")
    div.setAttribute("id", `ingrediente${indice}`)
    div.classList.add("flex", "gap-3")
    div.innerHTML = `<input class="w-full h-[40px] rounded-[6px] border-2 border-stone-300 pl-[10px] mb-4">
    <box-icon name='x' onclick="removerIngrediente('#ingrediente${indice}')"></box-icon>` 

    lista.append(div)
}

function removerIngrediente(id){
    let div = document.querySelector(id)
    div.remove()
}