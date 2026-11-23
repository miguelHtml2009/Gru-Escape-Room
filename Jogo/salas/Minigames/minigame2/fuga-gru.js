const CUTSCENE_FUGA = "../../finais/finalFuga/finalFuga.html";
const CUTSCENE_CONGELADO = "../../finais/finalCongelado/finalCongelado.html";

const posicoesPista = [45, 225, 405];

const vector = {
    pista: 1,
    vidas: 4,
    elemento: document.getElementById("vector")
};

const gru = {
    pista: 1,
    elemento: document.getElementById("gru")
};

const jogo = {
    ativo: false,
    progressoFuga: 0,
    relogioJogo: null,
    relogioGru: null
};

let raios = [];

const elementoCamadaRaios = document.getElementById("camada-raios");
const elementoProgresso = document.getElementById("texto-progresso");
const elementoTelaFim = document.getElementById("tela-fim");
const elementoTituloFim = document.getElementById("titulo-fim");
const elementoVidas = document.getElementById("texto-vidas");

// Movimentação Vector
function atualizarPosicaoVector() {
    vector.elemento.style.left = posicoesPista[vector.pista] + "px";
}

document.onkeydown = function (evento) {
    if (!jogo.ativo || evento.repeat) {
        return;
    }

    if (evento.key === "ArrowLeft" || evento.key === "a" || evento.key === "A") {
        if (vector.pista > 0) {
            vector.pista = vector.pista - 1;
            atualizarPosicaoVector();
        }
    } else if (evento.key === "ArrowRight" || evento.key === "d" || evento.key === "D") {
        if (vector.pista < 2) {
            vector.pista = vector.pista + 1;
            atualizarPosicaoVector();
        }
    }
};

// Movimentação e Disparos do Gru
function atualizarPosicaoGru() {
    gru.elemento.style.left = (posicoesPista[gru.pista] - 8) + "px";
}

function acaoGru() {
    if (!jogo.ativo) {
        return;
    }

    if (Math.random() < 0.6) {
        gru.pista = vector.pista;
    } else {
        gru.pista = Math.floor(Math.random() * 3);
    }

    atualizarPosicaoGru();

    raios.push({
        pista: gru.pista,
        y: 590
    });
}

// Raios
function desenharRaios() {
    let htmlRaios = "";

    for (let i = 0; i < raios.length; i++) {
        let raioAtual = raios[i];
        let posX = posicoesPista[raioAtual.pista];

        htmlRaios = htmlRaios + `
            <div class="raio" style="left: ${posX}px; top: ${raioAtual.y}px;"></div>
        `;
    }

    elementoCamadaRaios.innerHTML = htmlRaios;
}

function moverRaios() {
    if (!jogo.ativo) {
        return;
    }

    let raiosAindaNaTela = [];

    for (let i = 0; i < raios.length; i++) {
        let raio = raios[i];
        raio.y = raio.y - 24;

        let mesmaPista = (raio.pista === vector.pista);
        let bateuAltura = (raio.y < 120 && (raio.y + 90) > 50);

        if (mesmaPista && bateuAltura) {
            vector.vidas = vector.vidas - 1;
            elementoVidas.innerText = vector.vidas;

            if (vector.vidas <= 0) {
                desenharRaios();
                finalizarJogo(false);
                return;
            }
            continue;
        }

        if (raio.y > -90) {
            raiosAindaNaTela.push(raio);
        }
    }

    raios = raiosAindaNaTela;
    desenharRaios();

    jogo.progressoFuga = jogo.progressoFuga + 0.09;//Controle da duração da fase

    if (jogo.progressoFuga >= 100) {
        elementoProgresso.innerText = "100%";
        finalizarJogo(true);
        return;
    }

    elementoProgresso.innerText = Math.floor(jogo.progressoFuga) + "%";
}

// Colisão, progresso e redirecionamento para cutscenes
function finalizarJogo(venceu) {
    jogo.ativo = false;
    clearInterval(jogo.relogioJogo);
    clearInterval(jogo.relogioGru);

    if (venceu) {
        elementoTituloFim.innerText = "Você fugiu!";
        elementoTelaFim.classList.remove("oculto");

        setTimeout(function () {
            window.location.href = "../../finais/finalBom/finalBom.html";
        }, 1500);
    } else {
        vector.elemento.classList.add("congelado");
        elementoTituloFim.innerText = "Você foi congelado!";
        elementoTelaFim.classList.remove("oculto");

        setTimeout(function () {
            window.location.href = "../../finais/finalRuim/finalRuim.html";
        }, 1500);
    }
}

function iniciarJogo() {
    clearInterval(jogo.relogioJogo);
    clearInterval(jogo.relogioGru);

    vector.pista = 1;
    vector.vidas = 4;
    vector.elemento.classList.remove("congelado");

    gru.pista = 1;

    jogo.ativo = true;
    jogo.progressoFuga = 0;
    raios = [];

    elementoProgresso.innerText = "0%";
    elementoVidas.innerText = vector.vidas;
    elementoCamadaRaios.innerHTML = "";
    elementoTelaFim.classList.add("oculto");

    atualizarPosicaoVector();
    atualizarPosicaoGru();

    jogo.relogioJogo = setInterval(moverRaios, 25);
    jogo.relogioGru = setInterval(acaoGru, 480);
}

iniciarJogo();