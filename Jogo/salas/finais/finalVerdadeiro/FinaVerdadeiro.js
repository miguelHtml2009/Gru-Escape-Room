window.onload = function () {
    const botao = document.getElementById("Reinicia");
    if (botao) {
        botao.focus();
    }
};

function Reiniciar() {
    localStorage.clear();
    window.location.href = "../../porao.html";
}