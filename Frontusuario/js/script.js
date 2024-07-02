function login() {

    const us = document.querySelector("#nomeusuario");
    const sh = document.querySelector("#senha");

    //usamos o comando trim para eleminar os espaços

    if (us.value.trim() == "" || sh.value.trim() == "") {
        return alert("Você deve preencher os campos");
    }


    fetch("http://127.0.0.1:4000/api/v1/users/login", {
        method: "POST",
        headers: {
            "accept": "application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify({
            nomeusuario: us.value,
            senha: sh.value
        })
    }).then((res) => res.json())
        .then((result) => {
            console.log(result);
        })
        .catch((error) => console.error(`Erro ao tenta acessar a api ${error}`));



}

function cadastrarUsuario() {
    const us = document.querySelector("#txtusuario");
    const sh = document.querySelector("#txtsenha");
    const ft = document.querySelector("#txtfotoperfil");

    if (us.value.trim() == "" || sh.value.trim() == "" || ft.value.trim() == "") {
        return alert("Preencha todos os campos");
    }
    fetch("http://127.0.0.1:4000/api/v1/users/cadastrar", {
        method: "POST",
        headers: {
            "accept": "application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify({
            nomeusuario: us.value,
            senha: sh.value,
            foto: ft.value
        })
    })
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
        })
        .catch((error) => console.error(`Erro na api ${error}`))
}

function carregarLivros() {
    const conteudo = document.querySelector(".conteudo");
    fetch("http://localhost:4001/api/v1/livros/detalhes")
        .then((res) => res.json())
        .then((dados) => {
            dados.payload.map((rs) => {
                let card = `<div class="card col-md-3 livro">
            <img src=${rs.foto1} class="card-img-top">
            <div class="card-body">
            <h3>${rs.nometitulo}</h3>
              <p class="card-text">Autor:${rs.autor}</p>
              <p class="card-text" style="text-decoration:line-through">De R$ ${rs.precoatual}</p>
              <p class="card-text">R$ ${rs.precodesconto < 1 ? rs.precoatual : rs.precodesconto}</p>
              <a class="btn btn-warning" href="detalhes.html?idlivro=${rs.idtitulo}">Saiba mais</a>
            </div>
          </div>`;

                conteudo.innerHTML += card;

            })
        })
        .catch((error) => console.error(`erro na api ${error}`))

}

function detalhes() {
    let id_url = window.location.search.split('=');
    const conteudo = document.querySelector(".conteudo");
    fetch("http://localhost:4001/api/v1/livros/detalhes" + id_url[1])
        .then((res) => res.json())
        .then((dados) => {
            dados.payload.map((rs) => {
                let card = `<div class="card mb-3" style="width: 80rem;">
                <div class="row g-0">
                  <div class="col-md-4">
                    <div id="carouselExampleControls" class="carousel carousel-dark slide carousel-fade" data-bs-ride="carousel">
                      <div class="carousel-inner">
                        <div class="carousel-item active" style="background-color: #000;">
                          <img src="${rs.foto1}" class="d-block w-100" alt="...">
                        </div>
                        <div class="carousel-item" style="background-color: #000;">
                          <img src="${rs.foto2}" class="d-block w-100" alt="...">
                        </div>
                        <div class="carousel-item" style="background-color: #000;">
                          <img src="${rs.foto3}" class="d-block w-100" alt="...">
                        </div>
                        <div class="carousel-item" style="background-color: #000;">
                          <img src="${rs.foto4}" class="d-block w-100" alt="...">
                        </div>
                      </div>
                      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                      </button>
                      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                      </button>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h2 class="card-title">${rs.nometitulo}</h2>
                      <h4 class="card-title"> Author: ${rs.autor}</h4>
                      <p class="card-text">${rs.sinopse}</p>
                      <h3 class="card-text precoatual">Preço: <span class="badge text-bg-dark">R$ ${rs.precodesconto < 1 ? rs.precoatual : rs.precodesconto}</span></h3>
                    </div>
                  </div>
                </div>
              </div>`

                conteudo.innerHTML += card;

            })
        })
        .catch((error) => console.error(`erro na api ${error}`))
}

