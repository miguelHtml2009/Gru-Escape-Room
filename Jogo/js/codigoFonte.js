function save() {
    const dadosAntigos = JSON.parse(localStorage.getItem("escapeRoomProgresso")) || {};

    const progressoAtual = {

        // PORÃO
        portaAberta: document.getElementById("porta-aberta")
            ? !document.getElementById("porta-aberta").hidden
            : dadosAntigos.portaAberta,

        geladeiraAberta: document.getElementById("geladeira-aberta")
            ? !document.getElementById("geladeira-aberta").hidden
            : dadosAntigos.geladeiraAberta,

        geleiaColetada: document.getElementById("geleia")
            ? document.getElementById("geleia").hidden
            : dadosAntigos.geleiaColetada,

        // LABORATÓRIO
        chaveColetada: document.getElementById("chave")
            ? document.getElementById("chave").hidden
            : dadosAntigos.chaveColetada,

    quadroRasgado: typeof quadroRasgado !== "undefined"
    ? quadroRasgado
    : dadosAntigos.quadroRasgado,

        // LINHA DE MONTAGEM
        tampaAberta: typeof tampaAberta !== "undefined"
            ? tampaAberta
            : dadosAntigos.tampaAberta,

        energia: localStorage.getItem("energia") === "true"
            || dadosAntigos.energia === true,

        somEnergiaTocado: localStorage.getItem("somEnergiaTocado") === "true"
            || dadosAntigos.somEnergiaTocado === true,

        telefoneAtendido: typeof telefoneAtendido !== "undefined"
            ? telefoneAtendido
            : dadosAntigos.telefoneAtendido,

        telefoneBloqueadoAvisado: localStorage.getItem("telefoneBloqueadoAvisado") === "true"
            || dadosAntigos.telefoneBloqueadoAvisado === true,

        // FLIPERAMA

        // INVENTÁRIO
        inventarioHTML: document.getElementById("inventario")
            ? document.getElementById("inventario").innerHTML
            : dadosAntigos.inventarioHTML
    };

    // Salva todos os dados
    try {
        localStorage.setItem("escapeRoomProgresso", JSON.stringify(progressoAtual));
        return true;
    }
    catch (erro) {
        console.error("Erro ao salvar progresso:", erro);
        return false;
    }
}


// ==========================================
// 2. CARREGAR O PROGRESSO
// ==========================================

function carregarProgresso() {

    const dadosSalvos = localStorage.getItem("escapeRoomProgresso");
    if (!dadosSalvos) return;
    const progresso = JSON.parse(dadosSalvos);

    // PORÃO
    if (progresso.portaAberta != null && document.getElementById("porta-aberta")) {
        document.getElementById("porta-aberta").hidden = !progresso.portaAberta;
        document.getElementById("porta-fechada").hidden = progresso.portaAberta;
        document.getElementById("senha-porta").hidden = progresso.portaAberta;
        document.getElementById("senha-porta-w").hidden = !progresso.portaAberta;
    }

    if (progresso.geladeiraAberta != null && document.getElementById("geladeira-aberta")) {
        document.getElementById("geladeira-aberta").hidden = !progresso.geladeiraAberta;
        document.getElementById("geladeira-fechada").hidden = progresso.geladeiraAberta;
        document.getElementById("geleia").hidden = progresso.geleiaColetada;
    }


    // LABORATÓRIO
    if (progresso.chaveColetada != null && document.getElementById("chave")) {
        document.getElementById("chave").hidden = progresso.chaveColetada;
    }


    // LINHA DE MONTAGEM
    // ENERGIA
    if (progresso.energia === true) {
        localStorage.setItem("energia", "true");
    }
    // SOM DA ENERGIA
    if (progresso.somEnergiaTocado === true) {
        localStorage.setItem("somEnergiaTocado", "true");
    }

    // TELEFONE
    if (progresso.telefoneAtendido != null) {
        telefoneAtendido = progresso.telefoneAtendido;
    }

    if (progresso.telefoneBloqueadoAvisado === true) {
        localStorage.setItem("telefoneBloqueadoAvisado", "true");
    }


    // INVENTÁRIO
    const inventario = document.getElementById("inventario");
    if (inventario && progresso.inventarioHTML != null) {
        inventario.innerHTML = progresso.inventarioHTML;
    }

}


// ==========================================
// 3. ADICIONAR ITEM AO INVENTÁRIO
// ==========================================

function adicionarItem(id, imagem) {

    const inventario = document.getElementById("inventario");
    if (document.getElementById("item-" + id)) return;
    inventario.innerHTML += `
        <li id="item-${id}">
            <img src="${imagem}" alt="${id}">
        </li>
    `;
    save();
}


// ==========================================
// 4. REMOVER ITEM DO INVENTÁRIO
// ==========================================

function removerItem(id) {
    const item = document.getElementById("item-" + id);
    if (item) {
        item.outerHTML = "";
        save();
    }

}

carregarProgresso();

// ==========================================
// 5. MENU DE ☰
// ==========================================
function pause() {
    const menuPausa = document.getElementById("menu-pausa");

    // Se estiver escondido (hidden === true), ele mostra; se estiver visível, ele esconde.
    if (menuPausa.hidden) {
        menuPausa.hidden = false;
    } else {
        menuPausa.hidden = true;
    }
}

function fecharMenu() {
    const menuPausa = document.getElementById("menu-pausa");
    menuPausa.hidden = true;
}

function saveExit() {
    if (typeof save === "function") {
        save();
    }
    window.location.href = "../../index.html";
}
function deletarProgresso() {
    if (confirm("Tem certeza que deseja apagar todo o progresso do jogo?")) {
        localStorage.clear();
        window.location.href = "../../index.html";
    }
}
// ==========================================
// 6. Diário de bordo
// ==========================================
const diario = {

    pistas: [],
    abrir: function () {
        document.getElementById("fundo-diario").hidden = false;
        this.atualizar();
    },

    fechar: function () {
        document.getElementById("fundo-diario").hidden = true;
    },

    anotar: function (pista) {

        if (!this.pistas.includes(pista)) {
            this.pistas.push(pista);
            this.salvar();
            this.atualizar();
        }
    },

    atualizar: function () {

        const anotacoes = document.getElementById("anotacoes");
        anotacoes.innerHTML = "<ol></ol>";
        const lista = anotacoes.querySelector("ol");
        this.pistas.forEach(pista => {
            lista.innerHTML += `<li>${pista}</li>`;
        });
    },

    salvar: function () {
        localStorage.setItem("pistasDiario", JSON.stringify(this.pistas));
    },

    carregar: function () {
        this.pistas = JSON.parse(
            localStorage.getItem("pistasDiario")
        ) || [];
    }
};

diario.carregar();