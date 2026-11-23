const buraco = document.getElementById("buraco");
const chave = document.getElementById("chave");
const interruptor = document.getElementById("seguranca");
const painelSeguranca = document.getElementById("painel-seguranca");

const Monster = {
    Elemento: document.getElementById("Monster"),
    Coletado: false,
}

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
    diario.anotar("Item coletado: Chave Phillips enferrujada.");
    save();
}

function rasgarPintura() {
    document.getElementById("quadro").classList.add("sumir");

    quadroRasgado = true;
    buraco.hidden = false;

    if (!document.getElementById("item-chaveFenda")) {
        chave.hidden = false;
    }
    diario.anotar("Encontrei um buraco escondido atrás do quadro no laboratório.");
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
        diario.anotar("Acesso liberado no computador do Dr. Nefário.");
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

    if (desativada) {
        diario.anotar("Sistema de segurança e alarmes da fábrica desativados.");
    }
    localStorage.setItem("seguranca", desativada ? "false" : "true");
}

interruptor.onchange = atualizarSeguranca;

function ColetarMonster(){
    Monster.Coletado = true;
    Monster.Elemento.hidden = true;
    mensagem.innerHTML = "Um monster amarelo, sua consistência é meio gelatinosa";
    adicionarItem("Monster", "../../Sprites/Monster.png");
    diario.anotar("Item coletado: Lata de Monster amarelo.");
    save();
}
