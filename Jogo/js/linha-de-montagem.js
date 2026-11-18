const mensagem = document.getElementById("mensagem");
const painelTelefone = document.getElementById("painel-telefone");
const nomeNPC = document.getElementById("nome-npc");
const falaNPC = document.getElementById("fala-npc");
const opcoesTelefone = document.getElementById("opcoes-telefone");
const botaoContinuar = document.getElementById("continuar-fala");
var contp=0;
let telefoneAtendido = false;

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
        fala: "Alô? Está me ouvindo? Há alguém pela Linha de Montagem?",
        opcoes: [
            {
                texto: "Quem está falando? *",
                proximo: "identidade"
            },
            {
                texto: "Sim, estou na linha de montagem. O que você quer?",
                proximo: "ajuda"
            }
        ]
    },

    identidade: {
        nome: "Dr. Nefário",
        fala: "Eu sou o Dr. Nefário, um cientista que ajudava Gru a ser o maior vilão da história, mas me aposentei recentemente desses ofícios.",
        opcoes: [
            {
                texto: "Por que você está aqui então? *",
                proximo: "aposentadoria"
            },
            {
                texto: "Não confio em você. *",
                proximo: "desconfianca"
            },
            {
                texto: "Certo, o que você quer?",
                proximo: "ajuda"
            }
        ]
    },

    aposentadoria: {
        nome: "Dr. Nefário",
        fala: "Estou aqui porque queria checar se meu amigo Gru estava bem. Mas ele está insano e me culpou por não estar presente na hora do incidente. Ele vai me matar se me encontrar. Precisamos trabalhar juntos para sair daqui.",
        opcoes: [
            {
                texto: "Você sabe que fui eu quem queimou a casa, né? *",
                proximo: "vector"
            },
            {
                texto: "O que eu preciso fazer para sair daqui?",
                proximo: "ajuda"
            }
        ]
    },

    vector: {
        nome: "Dr. Nefário",
        fala: "O QUÊ?! Você é o Vector? Eu não posso acreditar nisso, não... Você agiu de forma inconsequente e pessoas inocentes morreram pela sua mesquinhez,boa sorte saindo sozinho daqui.",
        opcoes: []
    },

    desconfianca: {
        nome: "Dr. Nefário",
        fala: "Você pode desconfiar de mim o quanto quiser. Mas sou sua única chance de sair daqui. Não tenho motivos para colocar minha própria vida em risco.",
        opcoes: [
            {
                texto: "Tudo bem, vou escutar.",
                proximo: "ajuda"
            }
        ]
    },

    ajuda: {
        nome: "Dr. Nefário",
        fala: "A energia da fábrica voltou a funcionar. Temos um pequeno problema, entretanto. Os sistemas de segurança também foram reativados.",
        opcoes: [
            {
                texto: "E daí?",
                proximo: "problema"
            },
            {
                texto: "Como você sabe que a energia voltou? *",
                proximo: "energia"
            }
        ]
    },

    energia: {
        nome: "Dr. Nefário",
        fala: "Ora, eu conheço essa fábrica como a palma da minha mão! Além disso, acompanho alguns dos sistemas remotamente. Agora precisamos aproveitar que você conseguiu restaurar a energia.",
        opcoes: [
            {
                texto: "Certo, continue.",
                proximo: "problema"
            }
        ]
    },

    problema: {
        nome: "Dr. Nefário",
        fala: "Se você tentar sair pela porta principal, Gru será imediatamente notificado. Precisamos encontrar uma maneira de desativar o sistema de segurança antes de fugir.",
        opcoes: [
            {
                texto: "Como podemos fazer isso?",
                proximo: "plano"
            },
            {
                texto: "Qual é a senha da porta? *",
                proximo: "porta"
            }
        ]
    },

    porta: {
        nome: "Dr. Nefário",
        fala: "Se eu soubesse, já teria saído! Gru atualizou tudo depois da minha saída. Quem sabe ele nunca tenha sido uma boa pessoa... Mas os Minions devem saber, eles estavam por toda a fábrica. Tente perguntar a algum deles.",
        opcoes: [
            {
                texto: "Entendi. Vamos voltar ao plano.",
                proximo: "plano"
            }
        ]
    },

    plano: {
        nome: "Dr. Nefário",
        fala: "Existe um computador no laboratório que controla boa parte dos sistemas da fábrica. Precisamos acessá-lo e desligar as câmeras e os alarmes.",
        opcoes: [
            {
                texto: "Como acesso o computador?",
                proximo: "computador"
            },
            {
                texto: "Você não pode fazer isso remotamente? *",
                proximo: "remotamente"
            },
            {
                texto: "E depois disso? *",
                proximo: "fuga"
            }
        ]
    },

    remotamente: {
        nome: "Dr. Nefário",
        fala: "Infelizmente, Gru bloqueou meu acesso remoto depois da minha aposentadoria. Se eu pudesse resolver tudo daqui, não precisaria da sua ajuda, não é mesmo?",
        opcoes: [
            {
                texto: "Faz sentido. Como acesso o computador?",
                proximo: "computador"
            }
        ]
    },

    fuga: {
        nome: "Dr. Nefário",
        fala: "Depois disso, poderemos atravessar a fábrica sem sermos detectados. Mas ainda teremos que encontrar uma saída. A porta principal está protegida por uma senha que Gru alterou recentemente.",
        opcoes: [
            {
                texto: "Vamos resolver uma coisa de cada vez. Como acesso o computador?",
                proximo: "computador"
            }
        ]
    },

    computador: {
        nome: "Dr. Nefário",
        fala: "Você pode utilizar meu usuário para entrar no sistema. O nome de usuário é Nefario. A senha é Minions123.",
        opcoes: [
            {
                texto: "Entendi. Vou procurar o laboratório.",
                proximo: "laboratorio"
            },
            {
                texto: "E se a senha não funcionar? *",
                proximo: "senha"
            }
        ]
    },

    senha: {
        nome: "Dr. Nefário",
        fala: "Deveria funcionar! Gru provavelmente não se deu ao trabalho de alterar as minhas credenciais. Pelo menos espero que não...",
        opcoes: [
            {
                texto: "Vou tentar.",
                proximo: "laboratorio"
            }
        ]
    },

    laboratorio: {
        nome: "Dr. Nefário",
        fala: "Ótimo! Quando conseguir acessar o computador, procure a opção de segurança e desative todos os sistemas de vigilância. Avise-me quando terminar.",
        opcoes: []
    }

};




function atender() {

    if (telefoneAtendido) {
        return;
    }

    telefoneAtendido = true;

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

// Painel de fios
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