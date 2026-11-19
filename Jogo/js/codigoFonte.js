if (cont == 0){
    localStorage.setItem("energia", "false");
}

// Função para salvar o progresso sem apagar dados de outras salas
function save() {
    // Pega o progresso antigo que já está salvo (para não perder dados de outras salas)
    const dadosAntigos = JSON.parse(localStorage.getItem("escapeRoomProgresso")) || {};

    // Cria um objeto atualizando apenas os elementos que existem na página atual
    const progressoAtual = {
        portaAberta: document.getElementById("porta-aberta") ? !document.getElementById("porta-aberta").hidden : dadosAntigos.portaAberta,
        geladeiraAberta: document.getElementById("geladeira-aberta") ? !document.getElementById("geladeira-aberta").hidden : dadosAntigos.geladeiraAberta,
        geleiaColetada: document.getElementById("geleia") ? document.getElementById("geleia").hidden : dadosAntigos.geleiaColetada,
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

    // Restaura a porta (só se os elementos existirem nesta página)
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

    // Restaura a geladeira (só se os elementos existirem nesta página)
    if (progresso.geladeiraAberta && document.getElementById("geladeira-aberta")) {
        const gAberta = document.getElementById("geladeira-aberta");
        const gFechada = document.getElementById("geladeira-fechada");
        if (gAberta) gAberta.hidden = false;
        if (gFechada) gFechada.hidden = true;
    }

    // Restaura a geleia no cenário (só se o elemento existir nesta página)
    if (progresso.geleiaColetada && document.getElementById("geleia")) {
        const geleia = document.getElementById("geleia");
        if (geleia) geleia.hidden = true;
    }

    // Restaura o inventário (se existir na página)
    const inventario = document.getElementById("inventario");
    if (inventario && progresso.inventarioHTML) {
        inventario.innerHTML = progresso.inventarioHTML;
    }
}

// Executa o carregamento ao abrir a página
carregarProgresso();