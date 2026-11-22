const buraco = document.getElementById("buraco");
const chave = document.getElementById("chave");
const interruptor = document.getElementById("seguranca");
const painelSeguranca = document.getElementById("painel-seguranca");

let energia = localStorage.getItem("energia") === "true";

function abrirComputador() {
    if (energia == true) {
        document.getElementById("zoom").hidden = false;
        document.getElementById("passwordInput").hidden = false;
        document.getElementById("fechar").hidden = false;
        document.getElementById("nefario").hidden = false;
    } else
        document.getElementById("mensagem").textContent = "Não tá ligando";
}

function sairZoom() {
    document.getElementById("zoom").hidden = true;
    document.getElementById("passwordInput").hidden = true;
    document.getElementById("fechar").hidden = true;
    document.getElementById("nefario").hidden = true;
    document.getElementById("zoom2").hidden = true;
    document.getElementById("passwordInput2").hidden = true;
    document.getElementById("area-trabalho").hidden = true;
    document.getElementById("app").hidden = true;
    document.getElementById("desativar").hidden = true;
    document.getElementById("desativado").hidden = true;
    painelSeguranca.style.display = "none";
}

function pegarChave() {
    document.getElementById("chave").hidden = true;
    document.getElementById("mensagem").textContent =
        "Você pegou uma chave de fenda, está suja de marrom na ponta, provavelmente ferrugem.";
    adicionarItem("chaveFenda", "../../Sprites/chave-Philps.png");
    save();
}

function rasgarPintura() {
    document.getElementById("quadro").classList.add("sumir");

    quadroRasgado = true;
    buraco.hidden = false;

    if (!document.getElementById("item-chaveFenda")) {
        chave.hidden = false;
    }
    save();
    document.getElementById("mensagem").textContent =
        "Você tirou o quadro e encontrou uma chave Phillips escondida no buraco!";
    chave.focus();
}

function bloqueioNefario() {
    document.getElementById("zoom").hidden = true;
    document.getElementById("passwordInput").hidden = true;
    document.getElementById("nefario").hidden = true;

    document.getElementById("zoom2").hidden = false;
    document.getElementById("passwordInput2").hidden = false;
    document.getElementById("passwordInput2").value = "";
    document.getElementById("area-trabalho").hidden = true;
}

function areaDeTrabalho() {
    let senha = document.getElementById("passwordInput2").value;

    if (senha === "Minions123") {
        document.getElementById("zoom2").hidden = true;
        document.getElementById("passwordInput2").hidden = true;
        document.getElementById("area-trabalho").hidden = false;
        document.getElementById("app").hidden = false;
        document.getElementById("mensagem").textContent = "Acesso autorizado!";
    } else {
        document.getElementById("mensagem").textContent = "Senha incorreta!";
        document.getElementById("passwordInput2").value = "";
        document.getElementById("passwordInput2").focus();
    }
}

function quase() {
    document.getElementById("area-trabalho").hidden = true;
    document.getElementById("app").hidden = true;

    // O painel só aparece depois de clicar no app
    painelSeguranca.style.display = "";

    // Recupera o estado salvo (segurança false = interruptor marcado)
    interruptor.checked = localStorage.getItem("seguranca") === "false";
    atualizarSeguranca();
}

function atualizarSeguranca() {
    const desativada = interruptor.checked;

    // Marcado: desativado.png aparece e seguranca = false
    // Desmarcado: desativar.png aparece e seguranca = true
    document.getElementById("desativado").hidden = !desativada;
    document.getElementById("desativar").hidden = desativada;

    localStorage.setItem("seguranca", desativada ? "false" : "true");
}

interruptor.addEventListener("change", atualizarSeguranca);

function fugirPorao(){
    window.location.href="Minigames/minigame2/fuga-gru.html";
}