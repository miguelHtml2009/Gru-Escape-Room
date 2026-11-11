const canvas = document.getElementById('sala');
const ctx = canvas.getContext('2d');
const fundo = document.getElementById('fundo');
const mensagem = document.getElementById('mensagem');
const inventario = document.getElementById('inventario');
/*^Elementos*/

const imgPortaFechada = document.getElementById('img-porta-fechada');
const imgPortaAberta = document.getElementById('img-porta-aberta');
const imgGavetaFechada = document.getElementById('img-gaveta-fechada');
const imgGavetaAberta = document.getElementById('img-gaveta-aberta');
const imgChave = document.getElementById('img-chave');
/*imagens dos elementos*/

let gavetaAberta = false;
let temChave = false;
let portaAberta = false;

/*^Variáveis de estado*/

const porta = { x: 60, y: 170, w: 180, h: 360 };
const gaveta = { x: 520, y: 390, w: 200, h: 140 };
const chave = { x: 560, y: 405, w: 100, h: 70 };

/*^Objetos e suas posições*/

function desenhar(){
    ctx.clearRect(0, 0, canvas.width, canvas.height); /* Apaga tudo */
    ctx.drawImage(fundo, 0, 0, canvas.width, canvas.height); /* Pinta a imagem de fundo */

    if (portaAberta){
        ctx.drawImage(imgPortaAberta, porta.x,porta.y,porta.w,porta.h);
    } else {
        ctx.drawImage(imgPortaFechada, porta.x,porta.y,porta.w,porta.h);
    }

    if(gavetaAberta){
        ctx.drawImage(imgGavetaAberta, gaveta.x,gaveta.y,gaveta.w,gaveta.h);
    } else{
        ctx.drawImage(imgGavetaFechada,gaveta.x,gaveta.y,gaveta.w,gaveta.h)
    }

    if(gavetaAberta && !temChave){
        ctx.drawImage(imgChave,chave.x,chave.y,chave.w,chave.h);
    }
}

function dentro(x, y, objeto) {
    return x >= objeto.x && x <= objeto.x + objeto.w &&
           y >= objeto.y && y <= objeto.y + objeto.h;
}

function cliques(evento){
    const x = evento.offsetX * (canvas.width / canvas.clientWidth);
    const y = evento.offsetY * (canvas.height / canvas.clientHeight);
    /*Posição do mouse para o jogo*/
    
    if (gavetaAberta && !temChave && dentro(x,y,chave)){
        temChave = true;
        inventario.textContent = 'Inventário: Chave';
    } else if(dentro(x,y,gaveta)){
        if(!gavetaAberta){
            gavetaAberta = true;
        } else {
            gavetaAberta = false;
        }
    } else if(dentro(x,y,porta)){
        if(portaAberta){
             mensagem.textContent = 'Você escapou! Fim do tutorial.';
        } else if(temChave){
            portaAberta = true;
            inventario.textContent = 'Inventário: Vazio';
        } else{
            mensagem.textContent = 'A porta está trancada. Procure uma chave.';
        }
    } 
    desenhar();
}
window.onload = desenhar;