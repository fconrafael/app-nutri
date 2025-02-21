function cadastrarUsuario() {
    event.preventDefault();
    let formulario = document.querySelector("#cadastro");
    let formData = new FormData(formulario);
    let data = Object.fromEntries(formData.entries());
    fetch(`http://localhost:8000/usuarios?email=${data.email}`)
    .then((resposta) => resposta.json())
    .then((resposta) => {

      if (resposta.length > 0) {
        alert("Usuário já cadastrado");
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
      .then(resposta => window.location.href="admin.html");
    })

}