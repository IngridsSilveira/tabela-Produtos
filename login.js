const fundoLogin = document.createElement("div");
fundoLogin.setAttribute("id", "fundoLogin");
fundoLogin.setAttribute("class", "fundoLogin");

const baseLogin = document.createElement("div");
baseLogin.setAttribute("id", "baseLogin");
baseLogin.setAttribute("class", "baseLogin");

const elementosLogin = document.createElement("div");
elementosLogin.setAttribute("id", "elementosLogin");
elementosLogin.setAttribute("class", "elementosLogin");

const logoLogin = document.createElement("div");
logoLogin.setAttribute("id", "logoLogin");
logoLogin.setAttribute("class", "logoLogin");

const img = document.createElement("img");
img.src = "assets/img/user.png";

const campoLogin = document.createElement("form");
campoLogin.setAttribute("class", "campoLogin");

const labelUsername = document.createElement("label");
labelUsername.innerHTML = "Username:";
const inputUsername = document.createElement("input");
inputUsername.setAttribute("type", "text");
inputUsername.setAttribute("id", "f_username");

const labelPassowrd = document.createElement("label");
labelPassowrd.innerHTML = "Senha:";
const inputPassword = document.createElement("input");
inputPassword.setAttribute("type", "password");
inputPassword.setAttribute("id", "f_senha");

const botoesLogin = document.createElement("div");
botoesLogin.setAttribute("class", "botoesLogin");

const btn_logar = document.createElement("button");
btn_logar.setAttribute("id", "btn_logar");
btn_logar.setAttribute("type", "submit");
btn_logar.innerHTML = "Login";

const btn_cancelar = document.createElement("button");
btn_cancelar.setAttribute("id", "btn_cancelar");
btn_cancelar.innerHTML = "Cancelar";
btn_cancelar.addEventListener("click", (evt) => {
  document.getElementById("fundoLogin").style.display = "none";
});

document.getElementById("btn_cancelar1").addEventListener("click", (evt) => {
  document.getElementById("janelaAdicionar").style.display = "none";
});
document.getElementById("btn_login").addEventListener("click", (evt) => {
  document.getElementById("fundoLogin").style.display = "flex";
});

const footer = document.createElement("footer");
const a = document.createElement("a");
a.innerHTML = "Desenvolvido por Ingrid de Souza";
a.setAttribute("href", "https://ingriddev.netlify.app/");

logoLogin.appendChild(img);
elementosLogin.append(logoLogin, campoLogin, botoesLogin, footer);
campoLogin.append(labelUsername, inputUsername, labelPassowrd, inputPassword);
footer.appendChild(a);
botoesLogin.append(btn_logar, btn_cancelar);
baseLogin.appendChild(elementosLogin);
fundoLogin.appendChild(baseLogin);
document.body.appendChild(fundoLogin);

export const usuario = {
  login: "admin",
  senha: "123",
};

const setLogin = (user) => {
  localStorage.setItem("usuario", usuario.login);
  localStorage.setItem("senha", usuario.senha);

  if (
    inputUsername.value === localStorage.getItem("usuario") &&
    inputPassword.value === localStorage.getItem("senha")
  ) {
    document.getElementById("fundoLogin").style.display = "none";
    document.getElementById("btn_login").style.display = "none";
    document.getElementById("btn_logout").style.display = "block";
  } else {
    alert("Nome ou senha incorretos");
  }
};

document.getElementById("btn_logar").addEventListener("click", (evt) => {
  setLogin(usuario);
});

document.getElementById("btn_logout").addEventListener("click", (evt) => {
  document.getElementById("btn_login").style.display = "block";
  document.getElementById("btn_logout").style.display = "none";
  localStorage.clear();
  alert("Você fez logout");
});