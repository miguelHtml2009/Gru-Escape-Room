
let energia = localStorage.getItem("energia") === "true";

function abrirPorta() {
    document.getElementById("senhaInput").hidden = false;
    document.getElementById("senha-porta2").hidden = false;
    document.getElementById("senhaInput").focus();
}
function fechar(){  
    //Se o painel estiver fechado não faz nada
    if (document.getElementById("senha-porta2").hidden) return;
    let senhaDigitada = document.getElementById("senhaInput").value;

    if (senhaDigitada === "2024") {
        document.getElementById("porta-aberta").hidden = false;
        document.getElementById("porta-fechada").hidden = true;
        document.getElementById("senha-porta").hidden = true;
        document.getElementById("senha-porta-w").hidden = false;
        document.getElementById("mensagem").textContent = "Você abriu a porta!";
        document.getElementById("senhaInput").value = "";
    } else if (senhaDigitada !== "") {
        //  Só avisa erro se o jogador realmente digitou alguma senha errada, o ESC não chama isso mais
        document.getElementById("mensagem").textContent = "Senha incorreta!";
    }
    document.getElementById("senhaInput").hidden = true;
    document.getElementById("senha-porta2").hidden = true;
    document.getElementById("senha-porta").focus(); // Foca devolta no elemento no tab
}
document.getElementById("senhaInput").onkeydown = function (event) {
    if (event.key === "Enter") {
        fechar();
    }
};
//Enter agora fecha também

function abrirGeladeira() {
    if (energia == true) {
        document.getElementById("geladeira-aberta").hidden = false;
        document.getElementById("geladeira-fechada").hidden = true;
        document.getElementById("mensagem").textContent = "Você abriu a geladeira!";
        document.getElementById("geleia").hidden = false;
        document.getElementById("geleia").focus();
    }
    else {
        document.getElementById("mensagem").textContent = "Você precisa restaurar a energia!";
    }
}

function pegarGeleia() {
    document.getElementById("geleia").hidden = true;
    adicionarItem("geleia", "../../Sprites/geleia-do-gru.png");
    document.getElementById("mensagem").textContent = "Você pegou a deliciosa geleia do Gru!";
}

function lerbilhete() {
    document.getElementById("bilhete-de-perto").hidden = false;
}

function deslerbilhete() {
    document.getElementById("bilhete-de-perto").hidden = true;
}

function sair() {
    // Sem nada salvo, a segurança conta como ativa (true)
    const segurancaAtiva = localStorage.getItem("seguranca") !== "false";

    clearInterval(intervaloTimer);
    localStorage.clear();

    if (segurancaAtiva) {
        window.location.href = "./finais/finalVerdadeiro/finalVerdadeiro.html";
    } else {
        window.location.href = "./finais/finalBom/finalBom.html";
    }
}
