const buraco = document.getElementById("buraco");
const chave = document.getElementById("chave");

let energia = localStorage.getItem("energia") === "true";

function abrirComputador() {
    if(energia==true){
        document.getElementById("zoom").hidden = false;
        document.getElementById("passwordInput").hidden=false;
        document.getElementById("fechar").hidden=false;
    }else 
        document.getElementById("mensagem").textContent = "Não tá ligando";
}

function sairZoom() {
    document.getElementById("zoom").hidden = true;
    document.getElementById("passwordInput").hidden=true;
    document.getElementById("fechar").hidden=true;
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
    buraco.hidden = false;
    
    if (!document.getElementById("item-chaveFenda")) {
        chave.hidden = false;
    }
    
    save();

    document.getElementById("mensagem").textContent = "Você rasgou o quadro e encontrou uma chave Phillips escondida no buraco!";
    chave.focus(); //Volta o foco pra chave quando o quadro cai
}