window.onload = function () {
    const video = document.getElementById("inicio");
    if (!video) return;

    video.muted = false;
    const tentativa = video.play();

    if (tentativa !== undefined) {
        tentativa.catch(function () {
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

function irParaMinigame() {
    window.location.href = "Minigames/minigame2/fuga-gru.html";
}