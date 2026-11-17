
const painelTelefone = document.getElementById("painel-telefone");
const nomeNPC = document.getElementById("nome-npc");
const falaNPC = document.getElementById("fala-npc");
const opcoesTelefone = document.getElementById("opcoes-telefone");
const botaoContinuar = document.getElementById("continuar-fala");

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
