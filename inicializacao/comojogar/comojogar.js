
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

/*imagens dos elementos*/
const jogo = {
    telaatual: 'sala',
    inventario: {
        chave: false,
        fenda: false
    },
    atualizarMensagens(texto,cor = 'white'){
        mensagem.textContent = texto;
        mensagem.style.color = cor;
    },
    atualizarInventario(texto){
        inventario.textContent = 'Inventario: ' + texto;
    }
};
const porta = {
    x: 60, y: 170, w: 180, h: 360,
    trancada : true,

    desenhar(ctx){
        const img = this.trancada ? imgPortaFechada : imgPortaAberta;
        ctx.drawImage(img, this.x, this.y, this.w, this.h);
    },

    interagir(){
        if (!this.trancada) {
            jogo.atualizarMensagens('Você escapou! Fim do tutorial.', 'lightgreen');
        } else if (jogo.inventario.chave) {
            this.trancada = false;
            jogo.atualizarInventario('Vazio');
            jogo.atualizarMensagens('Você destrancou a porta!');
        } else {
            jogo.atualizarMensagens('A porta está trancada. Procure uma chave.');
        }
    }
};
const chave = {
    x: 560, y: 405, w: 100, h: 70,
    coletada: false,
    desenhar(ctx){
        if(!this.coletada) ctx.drawImage(imgChave, this.x, this.y, this.w, this.h);    
    },
    interagir() {
        if(!this.coletada){
            this.coletada=true;
            jogo.inventario.chave = true;
            jogo.atualizarInventario('Chave');
            jogo.atualizarMensagens('Você pegou a chave!');
        }
    }
}
const gaveta = {
    x: 520, y: 390, w: 200, h: 140,
    trancada: true,
    aberta: false,
    desenhar(ctx){
        if(this.trancada){
            ctx.drawImage(imgGavetaTrancada, this.x, this.y, this.w, this.h); 
                
        } else if(this.aberta){
            ctx.drawImage(imgGavetaAberta, this.x, this.y, this.w, this.h); 
            if(!chave.coletada) ctx.drawImage(imgChave, chave.x, chave.y, chave.w, chave.h);
        } else{
            ctx.drawImage(imgGavetaFechada, this.x, this.y, this.w, this.h); 
        }
    },
    interagir() { 
        if (this.trancada) {
            jogo.telaatual = 'zoomGaveta';
            jogo.atualizarMensagens('A gaveta está presa por 6 parafusos.');
        } else {
            this.aberta = !this.aberta;
            jogo.atualizarMensagens(this.aberta ? 'Você abriu a gaveta.' : 'Você fechou a gaveta.');
        }
    }
}
const fenda = {
    x:610, y:200, w:24, h: 80,
    coletada: false,
    desenhar(ctx){
        if(!this.coletada) ctx.drawImage(imgFenda, this.x, this.y, this.w, this.h);
    },
    interagir() { 
        if (!this.coletada) {
            this.coletada = true;
            jogo.inventario.fenda = true;
            jogo.atualizarInventario('Chave de Fenda');
            jogo.atualizarMensagens('Você pegou a chave de fenda!');
        }
    }
}
const espelho = {
    x: 520, y:115 , w: 196, h:280,
    durabilidade:1,
    imagens: [espelho1, espelho2, espelho3, espelho4, espelho5],
    desenhar(ctx){
        ctx.drawImage(this.imagens[this.durabilidade - 1], this.x, this.y, this.w, this.h);
        if(this.durabilidade === 5) fenda.desenhar(ctx);
    },
    interagir(){
        if(this.durabilidade <5){
            this.durabilidade++;
        }
    }
};

const btmVoltar = { x: 20, y:20, w:110, h:40};
const gavetazoom = {x:100,y:90,w:600,h:420};

/*^Objetos e suas posições*/
function CriarParafusos(x,y){
    return{
        x: x, y: y, w: 36, h: 36,
        removido: false,
        desenhar(ctx) {
            if(!this.removido) ctx.drawImage(imgParafuso, this.x, this.y, this.w, this.h);
        },
        interagir(){
            if(!jogo.inventario.fenda){
                jogo.atualizarMensagens('Você precisa de uma chave de fenda!');
                return false;
            } 
            if(!this.removido){
                this.removido = true;
                jogo.atualizarMensagens('Parafuso removido!');
                return true;
            }
            return false;
        }
    };
}
const parafusos = [
    CriarParafusos(163, 153), CriarParafusos(601, 153),
    CriarParafusos(163, 411), CriarParafusos(601, 411),
    CriarParafusos(305, 283), CriarParafusos(455, 283) 
];

function verificarGaveta(){
    const todosRemovidos = parafusos.every(p => p.removido);
    if(todosRemovidos){
        gaveta.trancada = false;
        jogo.telaatual = 'sala';
        jogo.atualizarMensagens('Você desparafusou toda a gaveta! Agora pode abri-la.');
    }
}

function dentro(x, y, objeto) {
    return x >= objeto.x && x <= objeto.x + objeto.w &&
           y >= objeto.y && y <= objeto.y + objeto.h;
}

function desenhar(){
    ctx.clearRect(0, 0, canvas.width, canvas.height); /* Apaga tudo */
    if (jogo.telaatual === 'sala') {
        ctx.drawImage(fundo, 0, 0, canvas.width, canvas.height);
        porta.desenhar(ctx);
        gaveta.desenhar(ctx);
        espelho.desenhar(ctx);
    } 
    else if (jogo.telaatual === 'zoomGaveta') {
        ctx.fillStyle = "#1e1e1e";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(imgGavetaZoom, gavetazoom.x, gavetazoom.y, gavetazoom.w, gavetazoom.h);
        
        parafusos.forEach(p => p.desenhar(ctx));
        
        ctx.fillStyle = "#b32424";
        ctx.fillRect(btmVoltar.x, btmVoltar.y, btmVoltar.w, btmVoltar.h);
        ctx.fillStyle = "#ffffff";
        ctx.font = "20px Schoolbell, cursive";
        ctx.fillText("Voltar", btmVoltar.x + 28, btmVoltar.y + 27);
    }
    
}
    




function cliques(evento){

    const x = evento.offsetX * (canvas.width / canvas.clientWidth);
    const y = evento.offsetY * (canvas.height / canvas.clientHeight);
    jogo.atualizarMensagens('');
    /*Posição do mouse para o jogo*/
    if (jogo.telaatual === 'sala') {
        // Ordem de prioridade dos cliques
        if (gaveta.aberta && !chave.coletada && dentro(x, y, chave)) {
            chave.interagir();
        } else if (espelho.durabilidade === 5 && !fenda.coletada && dentro(x, y, fenda)) {
            fenda.interagir();
        } else if (dentro(x, y, porta)) {
            porta.interagir();
        } else if (dentro(x, y, gaveta)) {
            gaveta.interagir();
        } else if (dentro(x, y, espelho)) {
            espelho.interagir();
        }
    } 
    else if (jogo.telaatual === 'zoomGaveta') {
        if (dentro(x, y, btmVoltar)) {
            jogo.telaatual = 'sala';
        } else {
            // Verifica se clicou em algum parafuso
            parafusos.forEach(p => {
                if (dentro(x, y, p)) {
                    p.interagir();
                }
            });
            verificarGaveta();
        }
    }
    
    desenhar();
}
window.onload = desenhar;