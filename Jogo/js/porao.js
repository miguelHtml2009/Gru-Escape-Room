
let energia = localStorage.getItem("energia") === "true";

function abrirPorta() {
    document.getElementById("senhaInput").hidden = false;
    document.getElementById("senha-porta2").hidden = false;
}
function fechar(){
let senhaDigitada = document.getElementById("senhaInput").value;

    if (senhaDigitada === "1945") {
        // Se acertou: abre a porta e atualiza a mensagem
        document.getElementById("porta-aberta").hidden = false;
        document.getElementById("porta-fechada").hidden = true;
        document.getElementById("senha-porta").hidden = true;
        document.getElementById("senha-porta-w").hidden = false;

        document.getElementById("mensagem").textContent = "Você abriu a porta!";
        
        // Opcional: limpa o campo de texto
        document.getElementById("senhaInput").value = "";
    } else {
        // Se errou: avisa na mensagem
        document.getElementById("mensagem").textContent = "Senha incorreta!";
    }

    // Esconde o input e a imagem de fechar independentemente de acertar ou errar
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
    document.getElementById("mensagem").textContent = "Você pegou a deliciosa geleia do Gru!";

    const novoItem = document.createElement("li");

    const imagemGeleia = document.createElement("img");
    imagemGeleia.src = "../../Sprites/geleia-do-gru.png";
    imagemGeleia.alt = "Geleia do Gru";

    imagemGeleia.style.width = "80px";
    imagemGeleia.style.height = "auto";

    novoItem.appendChild(imagemGeleia);

    document.getElementById("inventario").appendChild(novoItem);
}

function lerbilhete() {
    document.getElementById("bilhete-de-perto").hidden = false;
}

function deslerbilhete() {
    document.getElementById("bilhete-de-perto").hidden = true;
}
