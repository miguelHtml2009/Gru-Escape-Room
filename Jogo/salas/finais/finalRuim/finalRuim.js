window.onload = function () {
    const video = document.getElementById("inicio");
    if (!video) return;

    video.muted = false;
    const tentativa = video.play();

    if (tentativa !== undefined) {
        tentativa.catch(function () {
            // Se abrir o arquivo direto sem clicar antes, muta para não travar o vídeo
            video.muted = true;
            video.play();
        });
    }
};

function ativarSom() {
    const video = document.getElementById("inicio");
    if (video && video.muted) {
        video.muted = false;
    }
}

document.onkeydown = function () {
    ativarSom();
};

function mostrarFinal() {
    const telaFinal = document.getElementById("tela-final");
    telaFinal.hidden = false;

    document.getElementById("Reinicia").focus();
}

function Reiniciar() {
    localStorage.clear();
    window.location.href = "../../porao.html";
}