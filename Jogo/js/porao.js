
let energia = localStorage.getItem("energia") === "true";

function abrirPorta() {
    let senha = prompt("Digite a senha de 4 dígitos:");

    if (senha == "1945") {
        document.getElementById("porta-aberta").hidden = false;
        document.getElementById("porta-fechada").hidden = true;
        document.getElementById("senha-porta").hidden = true;
        document.getElementById("senha-porta-w").hidden = false;

        document.getElementById("mensagem").textContent = "Você abriu a porta!";
    }
    else if (senha !== null) {
        document.getElementById("mensagem").textContent = "Senha incorreta!";
    }
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
