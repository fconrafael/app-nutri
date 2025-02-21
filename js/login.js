function logar() {
  event.preventDefault();
  let forme = document.querySelector("#login");
  let formData = new FormData(forme);
  let data = Object.fromEntries(formData.entries());

  fetch(`http://localhost:8000/usuarios?email=${data.email}&senha=${data.senha}`)
    .then((resposta) => resposta.json())
    .then((resposta) => {

      if (resposta.length == 0) {
        alert("Usuário não cadastrado");
        return;
      }
      if (resposta[0].senha != data.senha) {
        alert("Email ou senha incorreto");
        return;
      }
      window.location.href = "admin.html";
    });
}
