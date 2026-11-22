const posicoesPista = [45, 225, 405];

const vector = {
    pista: 1,
    vidas: 3,
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
function atualizarPosicaoVector(){
    vector.elemento.style.left = posicoesPista[vector.pista] + "px";
}

document.onkeydown = function(evento){
    if (!jogo.ativo) {
        return;
    }
    if(evento.key === "ArrowLeft" || evento.key === "a" || evento.key === "A"){
        if(vector.pista > 0){
            vector.pista = vector.pista - 1;
            atualizarPosicaoVector();
        }
    } else if(evento.key === "ArrowRight" || evento.key === "d" || evento.key === "D"){
        if(vector.pista < 2){
            vector.pista = vector.pista + 1;
            atualizarPosicaoVector();
        }
    }
};

//Movimentação e Disparos do Gru

function atualizarPosicaoGru(){
    //-8 por que o gru é gordo e ficaria torto
    gru.elemento.style.left = (posicoesPista[gru.pista] - 8) + "px";
}

function acaoGru(){
    if (!jogo.ativo) {
        return;
    }
    if(Math.random() < 0.6){ //60% de chance do Gru te perseguir
        gru.pista = vector.pista;
    } else{
        gru.pista = Math.floor(Math.random() * 3); // Gru vai para uma lane aleatória
    }

    atualizarPosicaoGru();

    raios.push({ //Cria o raio, na pista do gru e levemente acima dele 
        pista: gru.pista,
        y: 590
    });
}

// Raios

function desenharRaios(){
    let htmlRaios = ""; //Variável de texto vazia

    for (let i = 0; i < raios.length; i++) { //raios.length é o número de raios na tela
        let raioAtual = raios[i];
        let posX = posicoesPista[raioAtual.pista]; // Converte o número da pista em pixels

        htmlRaios = htmlRaios + `
            <div class="raio" style="left: ${posX}px; top: ${raioAtual.y}px;">
                
            </div>
        `;
    }

    elementoCamadaRaios.innerHTML = htmlRaios;
}

function moverRaios(){
    if (!jogo.ativo) {
        return;
    }

    let raiosAindaNaTela = [];

    for (let i = 0; i < raios.length; i++) {
        let raio = raios[i];

        //Raio vai subindo a cada chamada da função 
        raio.y = raio.y - 25;

        let mesmaPista = (raio.pista === vector.pista);
        let bateuAltura = (raio.y < 120 && (raio.y + 90) > 50); //Acertou a hitbox do Vector (40 até 130) com 10px de folga

        if(mesmaPista && bateuAltura){
            vector.vidas = vector.vidas - 1;
            elementoVidas.innerText = vector.vidas;

            if(vector.vidas <= 0){
                desenharRaios();
                finalizarJogo(false);
                return;
            }
            continue; //Raio vai sumir se bater
        }

        // Só mantém os raios que ainda estão na tela 
        if (raio.y > -90) {
            raiosAindaNaTela.push(raio);
        }
    }

    raios = raiosAindaNaTela;
    desenharRaios();

    jogo.progressoFuga = jogo.progressoFuga + 0.12; 

    if(jogo.progressoFuga >= 100){
        elementoProgresso.innerText = "100%";
        finalizarJogo(true);
        return;
    }
    elementoProgresso.innerText = Math.floor(jogo.progressoFuga) + "%";
}

//Colisão e progresso da fuga

function finalizarJogo(venceu){
    jogo.ativo = false;
    clearInterval(jogo.relogioJogo);
    clearInterval(jogo.relogioGru);

    if(venceu) {
        elementoTituloFim.innerText = "Você fugiu!";
    } else{
        vector.elemento.classList.add("congelado");
        elementoTituloFim.innerText = "Você foi congelado!";
    }

    elementoTelaFim.classList.remove("oculto");
}

function iniciarJogo(){
    clearInterval(jogo.relogioJogo);
    clearInterval(jogo.relogioGru);
    
    //Reseta tudo pro "default"
    vector.pista = 1;
    vector.vidas = 3;
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
    jogo.relogioGru = setInterval(acaoGru, 330);
}

iniciarJogo();