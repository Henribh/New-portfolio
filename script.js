let botao = document.getElementById("black");
let pagina = document.body;

botao.onclick = function() {
    pagina.classList.toggle("dark-mode");
};