const img = document.getElementById('img');
const cont = document.getElementById('cont');
const cate = document.getElementById('cate');
const select = document.getElementById('cat');
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
const categorias = {
    Menu : Menu,
    Porão: Porão,
    Fliperama: Fliperama
};

let lista = Menu;
let posicao = 0;

function proxima(){
    
    posicao = posicao + 1;

    if(posicao >= lista.length){
        posicao = 0;
    }
    mostrar()
}

function anterior(){
    posicao = posicao - 1;

    if(posicao < 0){
        posicao = lista.length - 1;
    }
    mostrar()
}

function mostrar(){
    img.src = lista[posicao];
    cont.innerHTML = (posicao + 1) + "/" + lista.length ;
    cate.innerHTML = select.value;
}

function trocarcategoria(novalista){
    lista = novalista;
    posicao = 0;
    mostrar()
}
function escolhercategoria(){
    const nome =select.value;
    trocarcategoria(categorias[nome]);

}
