let energia = localStorage.getItem("energia") === "true";
const cenarioEmergencia = document.getElementById("cenario-emergencia");
const textoMensagem = document.getElementById("mensagem");
const escuro = document.getElementById("escuro");
const boxPainel = document.getElementById("box-painel");
const painelMin = document.getElementById("Painelmin");
const cores = ["verde", "vermelho", "amarelo", "azul"];
const TOTAL_RODADAS = 5;

let sequencia = [];
let sequenciaJogador = [];
let timersGenius = [];
let rodada = 0;
let mostrandoSequencia = false;
let podeClicar = false;

const progressoSalvo = JSON.parse(localStorage.getItem("escapeRoomProgresso")) || {};
let falaNefario = progressoSalvo.falaNefario || 0;

const QuadroRobert = {
    elemento: document.getElementById("Robert"),
    rasgadoelemento: document.getElementById("RobertRasgado"),
    rasgado: progressoSalvo.robertRasgado === true
};

const Moeda = {
    elemento: document.getElementById("moeda"),
    coletada: progressoSalvo.moedaColetada === true
};

function limparTimersGenius() {
    for (let i = 0; i < timersGenius.length; i++) {
        clearTimeout(timersGenius[i]);
    }
    timersGenius = [];
}

function avisarLockdown() {
    if (energia) {
        textoMensagem.textContent = "A energia voltou! Use o painel colorido ao lado para destravar a porta.";
    } else {
        textoMensagem.textContent = "Não há energia, o sistema parece em um estado de lockdown.";
    }
}

function abrirPainel() {
    if (!energia) {
        textoMensagem.textContent = "O painel está apagado. Você precisa religar a energia primeiro.";
        return;
    }

    escuro.hidden = false;
    boxPainel.hidden = false;
    textoMensagem.textContent = "Clique no 'M' no centro do painel para iniciar a sequência de " + TOTAL_RODADAS + " rodadas.";
}

function voltarEscuro() {
    limparTimersGenius();
    if (escuro) escuro.hidden = true;
    if (boxPainel) boxPainel.hidden = true;
    mostrandoSequencia = false;
    podeClicar = false;
}

function piscarCor(cor) {
    const botao = document.getElementById(cor);
    if (!botao) return;

    botao.classList.add("aceso");
    setTimeout(function () {
        botao.classList.remove("aceso");
    }, 400);
}

function iniciarGenius() {
    if (mostrandoSequencia) return;

    limparTimersGenius();
    sequencia = [];
    sequenciaJogador = [];
    rodada = 0;
    proximaRodada();
}

function proximaRodada() {
    rodada++;
    const indiceAleatorio = Math.floor(Math.random() * cores.length);
    sequencia.push(cores[indiceAleatorio]);
    tocarSequencia();
}

function tocarSequencia() {
    limparTimersGenius();
    mostrandoSequencia = true;
    podeClicar = false;
    sequenciaJogador = [];
    textoMensagem.textContent = "Rodada " + rodada + " de " + TOTAL_RODADAS;

    for (let i = 0; i < sequencia.length; i++) {
        const timerPiscar = setTimeout(function () {
            piscarCor(sequencia[i]);

            if (i === sequencia.length - 1) {
                const timerLiberar = setTimeout(function () {
                    mostrandoSequencia = false;
                    podeClicar = true;
                }, 500);
                timersGenius.push(timerLiberar);
            }
        }, (i + 1) * 700);

        timersGenius.push(timerPiscar);
    }
}

function clicarCor(cor) {
    if (!podeClicar || mostrandoSequencia) return;

    piscarCor(cor);
    sequenciaJogador.push(cor);

    const indiceAtual = sequenciaJogador.length - 1;

    // Se o jogador errar a cor
    if (sequenciaJogador[indiceAtual] !== sequencia[indiceAtual]) {
        podeClicar = false;
        rodada = 0;
        sequencia = [];
        sequenciaJogador = [];
        erroGenius();
        textoMensagem.textContent = "Sequência incorreta!";
        return;
    }

    // Se acertou todas as cores da rodada atual
    if (sequenciaJogador.length === sequencia.length) {
        podeClicar = false;

        if (rodada === TOTAL_RODADAS) {
            vencerGenius();
        } else {
            textoMensagem.textContent = "Sequência Correta!";
            const timerProxima = setTimeout(function () {
                proximaRodada();
            }, 1000);
            timersGenius.push(timerProxima);
        }
    }
}

function erroGenius() {
    for (let i = 0; i < cores.length; i++) {
        piscarCor(cores[i]);
    }
}

function vencerGenius() {
    textoMensagem.textContent = "Acesso liberado! A porta de emergência foi destravada.";
    setTimeout(function () {
        voltarEscuro();
        cenarioEmergencia.classList.add("energia-ativa");
        painelMin.hidden = true;
        document.getElementById("Nefario").hidden = false;
        diario.anotar("Painel de cores resolvido: porta do refúgio aberta e Dr. Nefário libertado.");
        save();
    }, 800);
}

function perguntar() {
    const temMonsterNoInventario = document.getElementById("item-Monster") !== null;

    if (falaNefario === 0) {
        textoMensagem.textContent = "Dr. Nefário: Ah, finalmente! Pensei que ia ficar trancado nessa lata de sardinha por milênios! Espera ai... VECTOR? O que você faz aqui?!";
        falaNefario = 1;
        save();
    } else if (falaNefario === 1) {
        textoMensagem.textContent = "Você: Eu te salvei! Agora vê se me ajuda a fugir, como eu jogo aquele fliperama?";
        falaNefario = 2;
        save();
    } else if (falaNefario === 2) {
        textoMensagem.textContent = "Dr. Nefário: Não sei, e mesmo se eu soubesse, sem cafeína meu cérebro não funciona...";
        diario.anotar("Dr. Nefário precisa de cafeína para conseguir ajudar.");
        falaNefario = 3;
        save();
    } else if (falaNefario === 3 && temMonsterNoInventario) {
        textoMensagem.textContent = "Dr. Nefário: Isso serve!, na verdade, sempre vi o Gru juntando Monster com esse Reagente... NOSSA PROVA UM POUQUINHO ";
        removerItem("Monster");
        diario.anotar("Entreguei a lata de Monster ao Dr. Nefário.");
        MonsterInsano();
        falaNefario = 4;
        save();
    } else if (falaNefario === 4) {
        textoMensagem.textContent = "Dr. Nefário: Se eu fosse você não me aproximaria dos Minions roxos! Um pouco de geleia cura eles...";
        diario.anotar("Dica do Dr. Nefário: geleia cura os Minions roxos.");
    } else {
        textoMensagem.textContent = "Dr. Nefário: Não sei, e mesmo se eu soubesse, sem cafeína meu cérebro não funciona...";
    }
}

function MonsterInsano() {
    document.body.classList.add("efeito-monster");
    QuadroRobert.elemento.hidden = false;
    setTimeout(function () {
        document.body.classList.remove("efeito-monster");
    }, 8000);
}
function rasgarRobert() {
    if (QuadroRobert.rasgado === false) {
        QuadroRobert.rasgado = true;
        QuadroRobert.elemento.hidden = true;
        QuadroRobert.rasgadoelemento.hidden = false;
        Moeda.elemento.hidden = false;
        textoMensagem.textContent = "Você rasgou o quadro do Robert Gru! Havia uma moeda escondida atrás dele.";
        diario.anotar("Rasguei o quadro de Robert Gru e encontrei uma moeda escondida.");
        save();
    }
}

function pegarMoeda() {
    if (Moeda.coletada === false) {
        Moeda.coletada = true;
        Moeda.elemento.hidden = true;
        textoMensagem.textContent = "Você pegou uma moeda dourada de fliperama!";
        adicionarItem("Moeda", "../../Sprites/moeda.png");
        diario.anotar("Item coletado: Moeda dourada de fliperama.");
        save();
    }
}