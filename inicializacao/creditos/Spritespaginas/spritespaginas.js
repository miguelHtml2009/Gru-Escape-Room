const img = document.getElementById('img');
const cont = document.getElementById('cont');
const cate = document.getElementById('cate');
const select = document.getElementById('cat');
const statusGaleria = document.getElementById('status-galeria');

const Menu = [
    "../../../Sprites/gru_brine.jpeg",
    "https://placehold.co/600x400",
    "../../../Sprites/tutoriall1.png",
    "../../../Sprites/tutoriall2.png"
];
const Porão = [
    "../../../Sprites/fios-fechado.png",
    "../../../Sprites/geladeira-fechada.png",
    "../../../Sprites/porta-aberta.png",
    "../../../Sprites/porta-fechada.png",
    "../../../Sprites/senha-porta.png",
    "../../../Sprites/parede.png",
    "../../../Sprites/diario.png"
];
const Fliperama = [
    "../../../Sprites/80amarelo.jpg",
    "../../../Sprites/banana.png",
    "../../../Sprites/bananatron.png",
    "../../../Sprites/game-over.png",
    "../../../Sprites/minion1.png",
    "../../../Sprites/minigame1.png"
];

const descricoes = {
    Menu: [
        "Gru malvado",
        "Imagem de exemplo do menu",
        "Tela do tutorial, parte 1",
        "Tela do tutorial, parte 2"
    ],
    Porão: [
        "Caixa de fios fechada no porão",
        "Geladeira fechada no porão",
        "Porta aberta do porão",
        "Porta fechada do porão",
        "Painel de senha da porta do porão",
        "Parede do porão",
        "Diário encontrado no porão"
    ],
    Fliperama: [
        "Cenário retrô amarelo do fliperama",
        "Sprite de banana do fliperama",
        "Máquina de fliperama Bananatron",
        "Tela de Game Over do fliperama",
        "Sprite de Minion no fliperama",
        "Tela do minigame do fliperama"
    ]
};

const categorias = {
    Menu: Menu,
    Porão: Porão,
    Fliperama: Fliperama
};

let lista = Menu;
let posicao = 0;

function proxima() {
    posicao = posicao + 1;

    if (posicao >= lista.length) {
        posicao = 0;
    }
    mostrar();
}

function anterior() {
    posicao = posicao - 1;

    if (posicao < 0) {
        posicao = lista.length - 1;
    }
    mostrar();
}

function mostrar() {
    const descricaoAtual = descricoes[select.value][posicao];
    img.src = lista[posicao];
    img.alt = descricaoAtual;
    cont.innerHTML = (posicao + 1) + "/" + lista.length;
    cate.innerHTML = select.value;

    if (statusGaleria) {
        statusGaleria.textContent = `Categoria ${select.value}, imagem ${posicao + 1} de ${lista.length}: ${descricaoAtual}`;
    }
}

function trocarcategoria(novalista) {
    lista = novalista;
    posicao = 0;
    mostrar();
}

function escolhercategoria() {
    const nome = select.value;
    trocarcategoria(categorias[nome]);
}