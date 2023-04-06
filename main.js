const configDgv = {
  endpoint: "http://localhost:3000/produtos",
  idDestino: "dgvDados",
};

const dataGridView = (configDgv) => {
  const dgvDados = document.getElementById(configDgv.idDestino);
  fetch(configDgv.endpoint)
    .then((res) => res.json())
    .then((res) => {
      res.forEach((el) => {
        const dgvLinha = document.createElement("div");
        dgvLinha.innerHTML = "";
        dgvLinha.setAttribute("class", "dgvLinha");
        dgvLinha.setAttribute("id", el.id);

        const c1 = document.createElement("div");
        c1.setAttribute("class", "coluna c1");
        c1.innerHTML = el.id;

        const c2 = document.createElement("div");
        c2.setAttribute("class", "coluna c2");
        c2.innerHTML = el.produto;

        const c3 = document.createElement("div");
        c3.setAttribute("class", "coluna c3");
        c3.innerHTML = el.marca;

        const c4 = document.createElement("div");
        c4.setAttribute("class", "coluna c4");
        c4.innerHTML = el.modelo;

        const c5 = document.createElement("div");
        c5.setAttribute("class", "coluna c5");

        const imgDelete = document.createElement("img");
        imgDelete.setAttribute("class", "dgvIcone");
        imgDelete.setAttribute("src", "assets/img/deletar.svg");
        imgDelete.addEventListener("click", (evt) => {
          const id = evt.target.parentNode.parentNode.firstChild.innerHTML;
          const div = evt.target.parentNode.parentNode;
          const endpoit = `http://localhost:3000/produtos/${id}`;

          try {
            if (
              localStorage.getItem("usuario") &&
              localStorage.getItem("senha")
            ) {
              fetch(endpoit, {
                method: "DELETE",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                },
              });

              if (id === div.id) {
                div.remove();
              } else {
                console.log("Você não pode apagar este item.");
              }
            } else {
              alert("Faça login");
            }
          } catch (error) {
            alert(error);
          }
        });

        const imgEditar = document.createElement("img");
        imgEditar.setAttribute("class", "dgvIcone");
        imgEditar.setAttribute("src", "assets/img/editar.svg");
        imgEditar.addEventListener("click", (evt) => {
          document.getElementById("janelaEditar").style.display = "flex";
          document.getElementById("f_id_editar").value = el.id;
          document.getElementById("f_produto_editar").value = el.produto;
          document.getElementById("f_marca_editar").value = el.marca;
          document.getElementById("f_modelo_editar").value = el.modelo;
        });

        const imgExibir = document.createElement("img");
        imgExibir.setAttribute("class", "dgvIcone");
        imgExibir.setAttribute("src", "assets/img/exibir.svg");
        imgExibir.addEventListener("click", (evt) => {
          document.getElementById("janelaView").style.display = "flex";
          document.getElementById("f_id").value = el.id;
          document.getElementById("f_produto").value = el.produto;
          document.getElementById("f_marca").value = el.marca;
          document.getElementById("f_modelo").value = el.modelo;
        });

        c5.append(imgDelete, imgEditar, imgExibir);
        dgvLinha.append(c1, c2, c3, c4, c5);
        dgvDados.appendChild(dgvLinha);
      });
    });
};
dataGridView(configDgv);

document.getElementById("btn_ok").addEventListener("click", (evt) => {
  document.getElementById("janelaView").style.display = "none";
});

document.getElementById("btn_gravar").addEventListener("click", (evt) => {
  const id = document.getElementById("f_id_editar").value;
  const produto = document.getElementById("f_produto_editar");
  const marca = document.getElementById("f_marca_editar");
  const modelo = document.getElementById("f_modelo_editar");
  const endpoit = `http://localhost:3000/produtos/${id}`;

  try {
    if (localStorage.getItem("usuario") && localStorage.getItem("senha")) {
      fetch(endpoit, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id: id.value,
          produto: produto.value,
          marca: marca.value,
          modelo: modelo.value,
        }),
      });
    } else {
      alert("Faça login");
    }
  } catch (error) {
    alert(error);
  }
});

document.getElementById("btn_cancelar").addEventListener("click", (evt) => {
  document.getElementById("janelaEditar").style.display = "none";
});
document.getElementById("btn_add").addEventListener("click", (evt) => {
  document.getElementById("janelaAdicionar").style.display = "flex";
});
document.getElementById("btn_adicionar").addEventListener("click", (evt) => {
  const produto = document.getElementById("f_produto_adicionar");
  const marca = document.getElementById("f_marca_adicionar");
  const modelo = document.getElementById("f_modelo_adicionar");
  const endpoit = `http://localhost:3000/produtos`;

  if (produto.value == "" || marca.value == "" || modelo.value == "") {
    alert("Preencha os itens corretamente");
    produto.focus();
  } else {
    try {
      if (localStorage.getItem("usuario") && localStorage.getItem("senha")) {
        fetch(endpoit, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            id: Math.floor(Math.random() * 100),
            produto: produto.value,
            marca: marca.value,
            modelo: modelo.value,
          }),
        });
      } else {
        alert("Faça login");
      }
    } catch (error) {
      alert(error);
    }
  }
});

window.addEventListener("load", () => {
  document.getElementById("f_produto_adicionar").value = "";
  document.getElementById("f_marca_adicionar").value = "";
  document.getElementById("f_modelo_adicionar").value = "";

  if (localStorage.getItem("usuario") && localStorage.getItem("senha")) {
    document.getElementById("btn_login").style.display = "none";
    document.getElementById("btn_logout").style.display = "block";
  }
});
