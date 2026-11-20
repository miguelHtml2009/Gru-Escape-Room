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
    document.getElementById("mensagem").textContent = "Você pegou uma chave de fenda, está suja de marrom na ponta, provavelmente ferrugem.";
    adicionarItem("chaveFenda", "../../Sprites/chave-Philps.png");
    save()
}

function rasgarPintura() {

    document.getElementById("quadro").classList.add("sumir");

    quadroRasgado = true;

    save();
}