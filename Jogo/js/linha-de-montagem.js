const mensagem = document.getElementById("mensagem");
const painelTelefone = document.getElementById("painel-telefone");
const nomeNPC = document.getElementById("nome-npc");
const falaNPC = document.getElementById("fala-npc");
const opcoesTelefone = document.getElementById("opcoes-telefone");
const botaoContinuar = document.getElementById("continuar-fala");
var contp=0;

// Painel dos fios
const escuro = document.getElementById("escuro");
const menu_escuro = document.getElementById("escuro-menu");

const p1 = {
    pa1:document.getElementById("p1"),
    solto:true
}
const p2 = {
    pa2:document.getElementById("p2"),
    solto:true
}
const p3 = {
    pa3:document.getElementById("p3"),
    solto:true
}
const p4 = {
    pa4:document.getElementById("p4"),
    solto:true
}

const painelfios = {
    Fechado: document.getElementById("fios-fechados"),
    Parafusado: document.getElementById("fios-parafusados"),  
    Abertomin: document.getElementById("fios-abertosmin"), /*imagem que esta na sala normal, menor*/
    Abertomax: document.getElementById("fios-abertosmax") /*Imagem que aparece quando clica, maior*/
};

const chaveFenda = {
    chave:document.getElementById("chave-fenda"),
    coletada:false
};

let intervaloFala;
let textoAtual = "";
let indiceTexto = 0;
let falando = false;
let dialogoAtual = null;


// Árvore de diálogos
const conversasTelefone = {

    inicio: {
        nome: "DESCONHECIDO",

        fala: "Alô? Está me ouvindo? Finalmente consegui entrar em contato com você. Escute com atenção, não temos muito tempo.",

        opcoes: [
            {
                texto: "Quem está falando?",
                proximo: "identidade"
            },
            {
                texto: "O que você quer?",
                proximo: "ajuda"
            },
            {
                texto: "Como conseguiu me ligar?",
                proximo: "numero"
            }
        ]
    },

    identidade: {
        nome: "Nefário",

        fala: "Eu sou o Dr. Nefário, um cientista que trabalhava para a corporação que controla essa fábrica. Mas agora estou do seu lado,.",

        opcoes: [
            {
                texto: "O que está acontecendo aqui?",
                proximo: "explicacao"
            },
            {
                texto: "Não confio em você.",
                proximo: "desconfianca"
            }
        ]
    },

    ajuda: {
        nome: "DESCONHECIDO",

        fala: "Preciso que você encontre uma maneira de desligar a energia da linha de montagem. Sem isso, não conseguirá avançar.",

        opcoes: [
            {
                texto: "Onde encontro o painel de energia?",
                proximo: "painel"
            },
            {
                texto: "Por que eu deveria ajudar?",
                proximo: "desconfianca"
            }
        ]
    },

    numero: {
        nome: "DESCONHECIDO",

        fala: "Digamos que eu conheço muito bem essa fábrica. Agora, por favor, me escute.",

        opcoes: [
            {
                texto: "Estou ouvindo.",
                proximo: "ajuda"
            }
        ]
    },

    explicacao: {
        nome: "DESCONHECIDO",

        fala: "Essa fábrica não é o que parece. Eles estão escondendo alguma coisa nos setores inferiores.",

        opcoes: [
            {
                texto: "Vou investigar.",
                proximo: "fim"
            }
        ]
    },

    painel: {
        nome: "DESCONHECIDO",

        fala: "Procure próximo aos fios. Deve existir um mecanismo capaz de interromper o funcionamento da máquina.",

        opcoes: [
            {
                texto: "Entendi.",
                proximo: "fim"
            }
        ]
    },

    desconfianca: {
        nome: "DESCONHECIDO",

        fala: "Você pode desconfiar de mim o quanto quiser. Mas sou sua única chance de sair daqui.",

        opcoes: [
            {
                texto: "Vou continuar ouvindo.",
                proximo: "ajuda"
            },
            {
                texto: "Chega dessa conversa.",
                proximo: "fim"
            }
        ]
    },

    fim: {
        nome: "DESCONHECIDO",

        fala: "Preciso desligar agora. Tome cuidado. Eles podem estar ouvindo.",

        opcoes: []
    }

};


// Atender ao telefone
function atender() {

    painelTelefone.style.display = "flex";

    mostrarDialogo("inicio");

}


// Mostrar diálogo
function mostrarDialogo(id) {

    const dialogo = conversasTelefone[id];

    if (!dialogo) return;

    dialogoAtual = dialogo;

    nomeNPC.textContent = dialogo.nome;

    textoAtual = dialogo.fala;
    indiceTexto = 0;

    falaNPC.textContent = "";

    opcoesTelefone.innerHTML = "";

    falando = true;

    botaoContinuar.style.display = "block";

    clearInterval(intervaloFala);

    intervaloFala = setInterval(() => {

        falaNPC.textContent += textoAtual[indiceTexto];

        indiceTexto++;

        if (indiceTexto >= textoAtual.length) {

            terminarFala();

        }

    }, 40);

}


// Terminar de mostrar a fala
function terminarFala() {

    clearInterval(intervaloFala);

    falaNPC.textContent = textoAtual;

    falando = false;

    botaoContinuar.style.display = "none";

    // Criar opções de resposta
    dialogoAtual.opcoes.forEach(opcao => {

        const botao = document.createElement("button");

        botao.textContent = opcao.texto;

        botao.addEventListener("click", () => {

            mostrarDialogo(opcao.proximo);

        });

        opcoesTelefone.appendChild(botao);

    });

}


// Mostrar fala completa ao clicar
function pularFala() {

    if (falando) {

        terminarFala();

    }

}


// Fechar telefone
function fecharTelefone() {

    clearInterval(intervaloFala);

    painelTelefone.style.display = "none";

    falando = false;

}

function pegarfenda(){
    chaveFenda.chave.style.display="none";
    chaveFenda.coletada=true;
}

function menuDesparafusar() {
    if(chaveFenda.coletada){
        escuro.style.display = "block";
        menu_escuro.style.display = "block";
        menu_escuro.style.border = "1px solid #806b48";
  
        if (painelfios.Abertomax.style.display != "block") {
            painelfios.Fechado.style.display = "block";
            mostrarParafusos();
        }
    } else{
        mensagem.innerHTML="Você não possui a ferramenta certa para isso.";
    }
}
function mostrarParafusos() {
    [p1.pa1, p2.pa2, p3.pa3, p4.pa4].forEach(function (parafuso) {
        if (!parafuso.classList.contains("solto")) { 
            parafuso.style.display = "block";
        }
    });
}

function voltarEscuro(){
    if(painelfios.Fechado.style.display == "block" || painelfios.Abertomax.style.display == "block"){
        menu_escuro.style.display = "none";
        escuro.style.display = "none";

        p1.pa1.style.display = "none";
        p2.pa2.style.display = "none";
        p3.pa3.style.display = "none";
        p4.pa4.style.display = "none";
    }
} 
function tirarParafuso(parafuso) {
    parafuso.style.display = "none";
    parafuso.classList.add("solto");
    contp++;
}
 function abrirPainel(){
    if(contp==4){
        painelfios.Fechado.style.display = "none";
        painelfios.Abertomax.style.display = "block";

        painelfios.Parafusado.style.display = "none";
        painelfios.Abertomin.style.display = "block";
    }
 }