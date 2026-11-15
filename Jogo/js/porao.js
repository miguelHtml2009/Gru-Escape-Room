function abrirPorta() {
    senha = prompt("Digite a senha de 4 dígitos:");

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
    if (energia==true) {
        document.getElementById("geladeira-aberta").hidden = false;
        document.getElementById("geladeira-fechada").hidden = true;
        document.getElementById("mensagem").textContent = "Você abriu a geladeira!";
        document.getElementById("geleia").hidden = false;
    }
    else {
        document.getElementById("mensagem").textContent = "A geladeira está trancada! Você precisa de energia para abri-la, as coisas do Gru são bizarras.";
    }
}

function pegarGeleia() {
    document.getElementById("geleia").hidden = true;
    document.getElementById("mensagem").textContent = "Você pegou a deliciosa geleia do Gru!";

    // Cria um novo elemento <li> para o inventário
    const novoItem = document.createElement("li");

    // Cria a tag <img> para colocar dentro do <li>
    const imagemGeleia = document.createElement("img");
    imagemGeleia.src = "../../Sprites/geleia-do-gru.png";
    imagemGeleia.alt = "Geleia do Gru";
    
    // Define um tamanho adequado para o sprite caber no inventário (ajuste se precisar)
    imagemGeleia.style.width = "80px"; 
    imagemGeleia.style.height = "auto";

    // Adiciona a imagem dentro do <li>
    novoItem.appendChild(imagemGeleia);

    // Adiciona o <li> na lista do inventário
    document.getElementById("inventario").appendChild(novoItem);
}

function lerbilhete() {
    document.getElementById("bilhete-de-perto").hidden = false;
}
function deslerbilhete() {
    document.getElementById("bilhete-de-perto").hidden = true;
}