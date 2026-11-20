
let energia = localStorage.getItem("energia") === "true";

function abrirPorta() {
    document.getElementById("senhaInput").hidden = false;
    document.getElementById("senha-porta2").hidden = false;
}
function fechar(){
let senhaDigitada = document.getElementById("senhaInput").value;

    if (senhaDigitada === "2024") {
        document.getElementById("porta-aberta").hidden = false;
        document.getElementById("porta-fechada").hidden = true;
        document.getElementById("senha-porta").hidden = true;
        document.getElementById("senha-porta-w").hidden = false;
        document.getElementById("mensagem").textContent = "Você abriu a porta!";
        document.getElementById("senhaInput").value = "";
    } else {
        document.getElementById("mensagem").textContent = "Senha incorreta!";
    }
    document.getElementById("senhaInput").hidden = true;
    document.getElementById("senha-porta2").hidden = true;
}

function abrirGeladeira() {
    if (energia == true) {
        document.getElementById("geladeira-aberta").hidden = false;
        document.getElementById("geladeira-fechada").hidden = true;
        document.getElementById("mensagem").textContent = "Você abriu a geladeira!";
        document.getElementById("geleia").hidden = false;
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
