const estado = jogo.fliperama || {
    maquinaUsada: false,
    pistas: []
};

jogo.fliperama = estado;

const SPRITES = {
    parede: "../../Sprites/parede.png",
    maquina: "../../Sprites/minigame1.png",
    minion: "../../Sprites/minion1.png"
};

const maquina = {
    id: "maquina-jogo",
    x: 800 - 510 / 2.2,
    y: 570 - 864 / 2.2,
    largura: 510 / 2.2,
    altura: 864 / 2.2,
    imagem: SPRITES.maquina,

    onclick() {
        estado.maquinaUsada = true;
        salvarJogo();
        window.location.href = "./minigame1.html";
    }
};

const minion = {
    id: "minion",
    x: (800 - 524 / 2.4) / 2,
    y: 570 - 653 / 2.4 + 12,
    largura: 524 / 2.4,
    altura: 653 / 2.4,
    imagem: SPRITES.minion,

    onclick() {
        mensagem.textContent = "Minion: Ei cara! Vai se foder";
    }
};

function carregarSala() {
    criarObjeto(maquina);
    criarObjeto(minion);
    desenharSala();
}

function salvarSala() {
    jogo.fliperama = {
        maquinaUsada: estado.maquinaUsada,
        pistas: diario.pistas
    };
}

carregarSala();