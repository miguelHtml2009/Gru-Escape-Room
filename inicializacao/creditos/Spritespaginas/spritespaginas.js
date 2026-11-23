const img = document.getElementById('img');
const cont = document.getElementById('cont');
const cate = document.getElementById('cate');
const select = document.getElementById('cat');
const statusGaleria = document.getElementById('status-galeria');

const Menu = [
    "../../../Sprites/gru_brine.jpeg",
    "../../../Sprites/papelfundotutorial.png",
    "../../../Sprites/porta-fechada.svg",
    "../../../Sprites/porta-aberta.svg",
    "../../../Sprites/gaveta-parafusada.svg",
    "../../../Sprites/gaveta-fechada.svg",
    "../../../Sprites/gaveta-aberta.svg",
    "../../../Sprites/gaveta-zoom.svg",
    "../../../Sprites/parafuso.svg",
    "../../../Sprites/espelho-1.svg",
    "../../../Sprites/espelho-2.svg",
    "../../../Sprites/espelho-3.svg",
    "../../../Sprites/espelho-4.svg",
    "../../../Sprites/espelho-5.svg",
    "../../../Sprites/chave-de-fenda.png",
    "../../../Sprites/chave.svg",
    "../../../Sprites/Devs.jpg"
    
];
const Porão = [

    "../../../Sprites/porta-fechada.png",
    "../../../Sprites/porta-aberta.png",
    "../../../Sprites/senha-porta.png",
    "../../../Sprites/senha-porta-zoom.png",
    "../../../Sprites/senha-porta-w.png",
    "../../../Sprites/geladeira-fechada.png",
    "../../../Sprites/geladeira-aberta.png",
    "../../../Sprites/geleia-do-gru.png",
    "../../../Sprites/bilhete.png",
    "../../../Sprites/bilhete-de-perto.png",
    "../../../Sprites/diario.png",
];
const Laboratório = [
    "../../../Sprites/computador.png",
    "../../../Sprites/zoom.png",
    "../../../Sprites/area-de-trabalho.png",
    "../../../Sprites/app.png",
    "../../../Sprites/zoom2.png",
    "../../../Sprites/quadro.png",
    "../../../Sprites/buraco.png",
    "../../../Sprites/chave-Philps.png",
    "../../../Sprites/desativar.png",
    "../../../Sprites/desativado.png"
];
const Fliperama = [
    "../../../Sprites/minion1roxo.png",
    "../../../Sprites/minion1.png",
    "../../../Sprites/minigame1.png",
    "../../../Sprites/80amarelo.jpg",
    "../../../Sprites/banana.png",
    "../../../Sprites/bananatron.png",
    "../../../Sprites/game-over.png"
];

const Linha_de_Montagem = [ 
    "../../../Sprites/fios-fechados.png",
    "../../../Sprites/fios-abertos-max.png",
    "../../../Sprites/Painel-Fios/amarelo-conectado.png",
    "../../../Sprites/Painel-Fios/amarelo-esquerda.png",
    "../../../Sprites/Painel-Fios/amarelo-direita.png",
    "../../../Sprites/Painel-Fios/amarela-tampa.png",
    "../../../Sprites/Painel-Fios/azul-conectado.png",
    "../../../Sprites/Painel-Fios/azul-esquerda.png",
    "../../../Sprites/Painel-Fios/azul-direita.png",
    "../../../Sprites/Painel-Fios/azul-tampa.png",
    "../../../Sprites/Painel-Fios/rosa-conectado.png",
    "../../../Sprites/Painel-Fios/rosa-esquerda.png",
    "../../../Sprites/Painel-Fios/rosa-direita.png",
    "../../../Sprites/Painel-Fios/rosa-tampa.png",
    "../../../Sprites/Painel-Fios/vermelho-conectado.png",
    "../../../Sprites/Painel-Fios/vermelho-esquerda.png",
    "../../../Sprites/Painel-Fios/vermelho-direita.png",
    "../../../Sprites/Painel-Fios/vermelho-tampa.png",
    "../../../Sprites/fios-parafusado.png",
    "../../../Sprites/parafuso.png",
    "../../../Sprites/fios-abertos.png",
    "../../../Sprites/fios-conectados.png",
    "../../../Sprites/telefone.png",
];
const Refugio = [

];
const descricoes = {
    Menu: [
        "Gru malvado",
        "Papel de fundo, parede branca e chão de madeira",
        "Porta de madeira fechada",
        "Porta de madeira aberta",
        "Gaveta parafusada",
        "Gaveta sem parafusos",
        "Gaveta aberta",
        "Gaveta sem parafusos zoom",
        "Parafusos",
        "Espelho inteiro",
        "Espelho um pouco rachado",
        "Espelho meio rachado",
        "Espelho muito rachado",
        "Espelho quebrado",
        "Chave de fenda",
        "Chave de outro",
        "Desenvolvedores Miguel e Guilherme"
        
    ],
    Porão: [
        "Geladeira fechada no porão",
        "Porta aberta do porão",
        "Painel de senha da porta do porão",
        "Painel de senha da porta do porão com zoom",
        "Painel de senha da porta do porão com o display vermelho, concluido",
        "Geladeira fechada",
        "Geladeira aberta",
        "Geleia do Gru",
        "Diário de Anotações"
    ],
    Laboratório: [
        "Computador desligado",
        "Computador com zoom, perfil do Gru",
        "Computador com muitos aplicativos na área de trabalho",
        "Aplicativo com uma câmera",
        "Computador com zoom, perfil do Dr.Nefário",
        "Pintura de um Minion trabalhador",
        "Buraco",
        "Chave de Fenda",
        "Computador escrito desativar Sistema de Segurança? ",
        "Computador escrito Sistemas de Segurança desativados"
    ],
    Fliperama: [
        "Minion roxo maluco",
        "Minion com roupa de prisioneiro",
        "Cenário retrô amarelo do fliperama",
        "Sprite de banana do fliperama",
        "Tela do minigame do fliperama",
        "Tela de Game Over do fliperama",
        "Máquina de fliperama Bananatron"
    ],
    Linha_de_Montagem: [
        "Painel de fios fechado",
        "Painel de fios aberto com zoom",
        "Fio amarelo conectado",
        "Ponta esquerda do fio amarelo",
        "Ponta direita do fio amarelo",
        "Tampa do terminal amarelo",
        "Fio azul conectado",
        "Ponta esquerda do fio azul",
        "Ponta direita do fio azul",
        "Tampa do terminal azul",
        "Fio rosa conectado",
        "Ponta esquerda do fio rosa",
        "Ponta direita do fio rosa",
        "Tampa do terminal rosa",
        "Fio vermelho conectado",
        "Ponta esquerda do fio vermelho",
        "Ponta direita do fio vermelho",
        "Tampa do terminal vermelho",
        "Painel de fios parafusado na esteira",
        "Parafuso",
        "Painel de fios destampado na esteira",
        "Painel de fios conectado na esteira",
        "Telefone vermelho",
        "Diário de Anotações"
    ],
    Refugio: [

    ]
};

const categorias = {
    Menu: Menu,
    Porão: Porão,
    Laboratório: Laboratório,
    Fliperama: Fliperama,
    Linha_de_Montagem: Linha_de_Montagem,
    Refugio: Refugio
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