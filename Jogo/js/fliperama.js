function curar() {
    const temGeleia = document.getElementById("item-geleia");

    if (!temGeleia) {
        document.getElementById("mensagem").textContent =
            "É perigoso chegar perto, ele não parece estar amigável.";
        return;
    }

    document.getElementById("minion1roxo").hidden = true;
    document.getElementById("minion1").hidden = false;
    document.getElementById("mensagem").textContent = "Você curou o Minion!";
    save();
}

const RECORDE_BOB = 15; // ajustar de acordo com o recorde do Bob
let falaAtual = 0;

function jogarMinigame() {
    const temMoeda = document.getElementById("item-Moeda");
    const fliperamaLiberado = localStorage.getItem("fliperamaLiberado") === "true";

    if (!temMoeda && !fliperamaLiberado) {
        document.getElementById("mensagem").textContent =
            "A máquina está travada. Você precisa de uma moeda para jogar!";
        return;
    }

    if (temMoeda) {
        removerItem("Moeda");
        localStorage.setItem("fliperamaLiberado", "true");
    }

    save(); // guarda o tempo antes de sair da sala
    window.location.href = "Minigames/minigame1.html";
}

function perguntar() {
    const msg = document.getElementById("mensagem");
    const record = parseInt(localStorage.getItem("record")) || 0;

    if (falaAtual === 0) {
        msg.textContent = "Você: Ei, você sabe a senha da porta do porão?";
        falaAtual = 1;
    } else if (falaAtual === 1) {
        msg.textContent =
            "Minion: Bello! Eu sei, mas só conto se você bater o recorde do Bob no Bananatron!";
        falaAtual = 2;
    } else if (record > RECORDE_BOB) {
        msg.textContent = "Minion: Você bateu o recorde do Bob! A senha é 2024.";
        diario.anotar("Senha da porta do porão: 2024");
    } else {
        msg.textContent =
            "Minion: Seu recorde é " + record + " e o do Bob é " + RECORDE_BOB + ". Vai jogar!";
    }
}