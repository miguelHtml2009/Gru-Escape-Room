function abrirComputador() {
        document.getElementById("zoom").hidden = false;
        document.getElementById("passwordInput").hidden=false;
}

function sairZoom() {
    document.getElementById("zoom").hidden = true;
    document.getElementById("passwordInput").hidden=true;
}

function pegarChave() {
    document.getElementById("chave").hidden = true;
    document.getElementById("mensagem").textContent = "Você pegou uma chave de fenda.";

    const novoItem = document.createElement("li");

    const imagemChave = document.createElement("img");
    imagemChave.src = "../../Sprites/chave-philips.svg";
    imagemChave.alt = "Geleia do Gru";

    imagemChave.style.width = "80px";
    imagemChave.style.height = "auto";

    novoItem.appendChild(imagemGeleia);

    document.getElementById("inventario").appendChild(novoItem);
}