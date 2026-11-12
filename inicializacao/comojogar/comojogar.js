
const canvas = document.getElementById('sala');
const ctx = canvas.getContext('2d');
const mensagem = document.getElementById('mensagem');
const inventario = document.getElementById('inventario');
/*^Elementos*/

const fundo = document.getElementById('fundo');
const imgPortaFechada = document.getElementById('img-porta-fechada');
const imgPortaAberta = document.getElementById('img-porta-aberta');
const imgGavetaTrancada = document.getElementById('img-gaveta-trancada');
const imgGavetaFechada = document.getElementById('img-gaveta-fechada');
const imgGavetaAberta = document.getElementById('img-gaveta-aberta');
const imgChave = document.getElementById('img-chave');
const imgFenda = document.getElementById('chavefenda');

const imgGavetaZoom = document.getElementById('img-gaveta-zoom');
const imgParafuso = document.getElementById('img-parafuso')

const espelho1 = document.getElementById('espelho1');
const espelho2 = document.getElementById('espelho2');
const espelho3 = document.getElementById('espelho3');
const espelho4 = document.getElementById('espelho4');
const espelho5 = document.getElementById('espelho5');

let telaAtual = 'sala';

/*imagens dos elementos*/

let gavetaTrancada = true;
let gavetaAberta = false;
let temChave = false;
let temFenda = false;
let portaAberta = false;

let espelho11 = true;
let espelho12 = false;
let espelho13 = false;
let espelho14 = false;
let espelho15 = false;
let espelho16 = false;

let parafuso1 = true;
let parafuso2 = true;
let parafuso3 = true;
let parafuso4 = true;
let parafuso5 = true;
let parafuso6 = true;

/*^Variáveis de estado*/

const porta = { x: 60, y: 170, w: 180, h: 360 };
const gaveta = { x: 520, y: 390, w: 200, h: 140 };
const chave = { x: 560, y: 405, w: 100, h: 70 };
const fenda = { x:610, y:200, w:24, h: 80 };
const espelho = { x: 520, y:115 , w: 196, h:280};

const btmVoltar = { x: 20, y:20, w:110, h:40};
const gavetazoom = {x:100,y:90,w:600,h:420};

const p1 = { x: 163, y: 153, w: 36, h: 36 }; 
const p2 = { x: 601, y: 153, w: 36, h: 36 }; 
const p3 = { x: 163, y: 411, w: 36, h: 36 }; 
const p4 = { x: 601, y: 411, w: 36, h: 36 }; 
const p5 = { x: 311, y: 286, w: 28, h: 28 }; 
const p6 = { x: 461, y: 286, w: 28, h: 28 };

/*^Objetos e suas posições*/

function desenhar(){
    ctx.clearRect(0, 0, canvas.width, canvas.height); /* Apaga tudo */
    ctx.drawImage(fundo, 0, 0, canvas.width, canvas.height); /* Pinta a imagem de fundo */


    if(telaAtual == 'sala'){
        if (portaAberta){
            ctx.drawImage(imgPortaAberta, porta.x,porta.y,porta.w,porta.h);
        } else {
            ctx.drawImage(imgPortaFechada, porta.x,porta.y,porta.w,porta.h);
        }
        if(gavetaTrancada){
            ctx.drawImage(imgGavetaTrancada,gaveta.x,gaveta.y,gaveta.w,gaveta.h);
        }else if(gavetaAberta){
            ctx.drawImage(imgGavetaAberta, gaveta.x,gaveta.y,gaveta.w,gaveta.h);
        } else{
            ctx.drawImage(imgGavetaFechada,gaveta.x,gaveta.y,gaveta.w,gaveta.h)
        }
        if(espelho11){
            ctx.drawImage(espelho1,espelho.x,espelho.y,espelho.w,espelho.h);
        }else if(espelho12){
            ctx.drawImage(espelho2,espelho.x,espelho.y,espelho.w,espelho.h);
        }else if(espelho13){
            ctx.drawImage(espelho3,espelho.x,espelho.y,espelho.w,espelho.h);
        }else if(espelho14){
            ctx.drawImage(espelho4,espelho.x,espelho.y,espelho.w,espelho.h);
        }else if(espelho15){
            ctx.drawImage(espelho5,espelho.x,espelho.y,espelho.w,espelho.h);
        }else if(espelho16){
            ctx.drawImage(espelho5,espelho.x,espelho.y,espelho.w,espelho.h);
        }
    
        if(espelho15 && !temFenda){
            ctx.drawImage(imgFenda,fenda.x,fenda.y,fenda.w,fenda.h);
        }
        if(gavetaAberta && !temChave){
            ctx.drawImage(imgChave,chave.x,chave.y,chave.w,chave.h);
        }
    } else if(telaAtual == 'zoomGaveta'){
        ctx.fillStyle = "#1e1e1e";
        ctx.fillRect(0,0, canvas.width, canvas.height);

        ctx.drawImage(imgGavetaZoom, gavetazoom.x,gavetazoom.y,gavetazoom.w,gavetazoom.h);

        if (parafuso1) ctx.drawImage(imgParafuso, p1.x, p1.y, p1.w, p1.h);
        if (parafuso2) ctx.drawImage(imgParafuso, p2.x, p2.y, p2.w, p2.h);
        if (parafuso3) ctx.drawImage(imgParafuso, p3.x, p3.y, p3.w, p3.h);
        if (parafuso4) ctx.drawImage(imgParafuso, p4.x, p4.y, p4.w, p4.h);
        if (parafuso5) ctx.drawImage(imgParafuso, p5.x, p5.y, p5.w, p5.h);
        if (parafuso6) ctx.drawImage(imgParafuso, p6.x, p6.y, p6.w, p6.h);
        
        ctx.fillStyle = "#b32424";
        ctx.fillRect(btmVoltar.x, btmVoltar.y, btmVoltar.w, btmVoltar.h);
        ctx.fillStyle = "#ffffff";
        ctx.font = "20px Arial";
        ctx.fillText("Voltar", btmVoltar.x + 28, btmVoltar.y + 27);
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
    
    if(telaAtual == 'sala'){
        if (gavetaAberta && !temChave && dentro(x,y,chave)){
            temChave = true;
            inventario.textContent = 'Inventário: Chave';
        } else if(dentro(x,y,gaveta)){
            if(!gavetaAberta && !gavetaTrancada){
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
        } else if(dentro(x,y,fenda) && espelho15 && !temFenda){
            temFenda = true;
            inventario.textContent = 'Inventário: Chave de Fenda';
        } else if(dentro(x,y,espelho)){
            if(dentro(x,y,espelho) && espelho11){
                espelho11 = false;
                espelho12 = true;
            }else if(dentro(x,y,espelho) && espelho12){
                espelho12 = false;
                espelho13 = true;
            }else if(dentro(x,y,espelho) && espelho13){
                espelho13 = false;
                espelho14 = true;
            }else if(dentro(x,y,espelho) && espelho14){
                espelho14 = false;
                espelho15 = true; 
            }
        }
    } else if(telaAtual == 'zoomGaveta'){
        cliqueZoomGaveta(x,y);
    }
    desenhar();
}

function cliqueZoomGaveta(x,y){
    if(dentro(x,y,btmVoltar)){
        telaAtual = 'sala';
        mensagem.textContent = '';
        return;
    }
    if (dentro(x, y, p1) || dentro(x, y, p2) || dentro(x, y, p3) || 
        dentro(x, y, p4) || dentro(x, y, p5) || dentro(x, y, p6)) {
            if(!temFenda){
                mensagem.textContent = 'Você precisa de uma chave de fenda!'
                return;
            }
    }        
}
window.onload = desenhar;