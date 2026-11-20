

// Função para salvar o progresso sem apagar dados de outras salas
function save() {
    const dadosAntigos = JSON.parse(localStorage.getItem("escapeRoomProgresso")) || {};

    const progressoAtual = {
        portaAberta: document.getElementById("porta-aberta") ? !document.getElementById("porta-aberta").hidden : dadosAntigos.portaAberta,
        geladeiraAberta: document.getElementById("geladeira-aberta") ? !document.getElementById("geladeira-aberta").hidden : dadosAntigos.geladeiraAberta,
        geleiaColetada: document.getElementById("geleia") ? document.getElementById("geleia").hidden : dadosAntigos.geleiaColetada,
        chaveColetada: document.getElementById("chave") ? document.getElementById("chave").hidden : dadosAntigos.chaveColetada,
        inventarioHTML: document.getElementById("inventario") ? document.getElementById("inventario").innerHTML : dadosAntigos.inventarioHTML
    };

    try {
        localStorage.setItem("escapeRoomProgresso", JSON.stringify(progressoAtual));
        console.log("Progresso salvo com sucesso!");
        return true;
    } catch (erro) {
        console.error("Não foi possível salvar o progresso:", erro);
        return false;
    }
}

// Função para carregar o progresso com segurança
function carregarProgresso() {
    const dadosSalvos = localStorage.getItem("escapeRoomProgresso");
    if (!dadosSalvos) return;

    const progresso = JSON.parse(dadosSalvos);

    if (progresso.portaAberta && document.getElementById("porta-aberta")) {
        const pAberta = document.getElementById("porta-aberta");
        const pFechada = document.getElementById("porta-fechada");
        const sPorta = document.getElementById("senha-porta");
        const sPortaW = document.getElementById("senha-porta-w");

        if (pAberta) pAberta.hidden = false;
        if (pFechada) pFechada.hidden = true;
        if (sPorta) sPorta.hidden = true;
        if (sPortaW) sPortaW.hidden = false;
    }

    if (progresso.geladeiraAberta && document.getElementById("geladeira-aberta")) {
        const gAberta = document.getElementById("geladeira-aberta");
        const gFechada = document.getElementById("geladeira-fechada");
        if (gAberta) gAberta.hidden = false;
        if (gFechada) gFechada.hidden = true;
    }

    if (progresso.geleiaColetada && document.getElementById("geleia")) {
        document.getElementById("geleia").hidden = true;
    }

    // Esconde a chave se ela já tiver sido coletada
    if ((progresso.chaveColetada || localStorage.getItem("chaveFenda") === "true") && document.getElementById("chave")) {
        document.getElementById("chave").hidden = true;
    }

    const inventario = document.getElementById("inventario");
    if (inventario && progresso.inventarioHTML) {
        inventario.innerHTML = progresso.inventarioHTML;
    }
}

// Executa o carregamento ao abrir a página
carregarProgresso();