const estado = jogo.porao;

const SPRITES = {
    portaFechada: "../../Sprites/porta-fechada.png",
    portaAberta: "../../Sprites/porta-aberta.png",
    geladeiraFechada: "../../Sprites/geladeira-fechada.png",
    geladeiraAberta: "../../Sprites/geladeira-aberta.png",
    senha: "../../Sprites/senha-porta.png",
    fiosFechado: "../../Sprites/fios-fechado.png",
    fiosAberto: "../../Sprites/fios-aberto.png",
    chave: "../../Sprites/chave-de-fenda.png"
};

const porta = {
    id: "porta",
    x: 30,
    y: 150,
    largura: 216,
    altura: 430,

    imagem: estado.portaAberta
        ? SPRITES.portaAberta
        : SPRITES.portaFechada,

    onclick() {
        mensagem.textContent = estado.portaAberta
            ? "A porta está aberta. Você pode sair."
            : "Porta trancada. Tente a senha do painel.";
    }
};

const geladeira = {
    id: "geladeira",
    x: 600,
    y: 235,
    largura: 170,
    altura: 340,

    imagem: estado.geladeiraAberta
        ? SPRITES.geladeiraAberta
        : SPRITES.geladeiraFechada,

    onclick() {
        if (!estado.geladeiraAberta) {
            estado.geladeiraAberta = true;
            this.imagem = SPRITES.geladeiraAberta;

            criarObjeto(chave);

            diario.registrarPista(
                "A geladeira escondia uma chave de fenda."
            );

            mensagem.textContent =
                "Você abriu a geladeira e encontrou uma chave de fenda.";

            salvarJogo();
            atualizarObjeto(this);
            return;
        }

        mensagem.textContent =
            "A geladeira está aberta.";
    }
};

const senha = {
    id: "senha",
    x: 260,
    y: 220,
    largura: 80,
    altura: 82,
    imagem: SPRITES.senha,

    onclick() {
        mensagem.innerHTML = `
            Digite a senha:
            <input id="campo-senha"
                   type="text"
                   inputmode="numeric"
                   maxlength="4">

            <button onclick="verificarSenha()">
                Confirmar
            </button>
        `;

        document.getElementById("campo-senha").focus();
    }
};

const fios = {
    id: "fios",
    x: 400,
    y: 450,
    largura: 120,
    altura: 120,

    imagem: estado.fiosAbertos
        ? SPRITES.fiosAberto
        : SPRITES.fiosFechado,

    onclick() {
        if (!estado.chaveEncontrada) {
            mensagem.textContent =
                "A caixa está parafusada. Você precisa de uma chave de fenda.";

            diario.registrarPista(
                "É necessário encontrar uma chave de fenda para abrir a caixa de fios."
            );

            return;
        }

        if (!estado.fiosAbertos) {
            estado.fiosAbertos = true;
            this.imagem = SPRITES.fiosAberto;

            mensagem.innerHTML = `
                Você abriu a caixa de fios.
                <button onclick="iniciarMinigame()">
                    Ligar os fios
                </button>
            `;

            atualizarObjeto(this);
            salvarJogo();
            return;
        }

        iniciarMinigame();
    }
};

const chave = {
    id: "chave",
    x: 650,
    y: 400,
    largura: 70,
    altura: 70,
    imagem: SPRITES.chave,

    onclick() {
        pegarChave();
    }
};

function atualizarObjeto(objeto) {
    const elemento = document.getElementById(objeto.id);

    if (elemento)
        elemento.src = objeto.imagem;
}

function pegarChave() {
    if (estado.chaveEncontrada)
        return;

    estado.chaveEncontrada = true;

    removerObjeto("chave");

    adicionarInventario("Chave de fenda");

    diario.registrarPista(
        "A chave de fenda pode abrir a caixa de fios."
    );

    mensagem.textContent =
        "Você pegou a chave de fenda.";

    salvarJogo();
}

function verificarSenha() {
    const campo = document.getElementById("campo-senha");

    if (!campo)
        return;

    if (campo.value !== "0000") {
        mensagem.textContent =
            "Senha incorreta.";

        return;
    }

    estado.portaAberta = true;

    porta.imagem = SPRITES.portaAberta;

    atualizarObjeto(porta);

    diario.registrarPista(
        "A senha da porta é 0000."
    );

    mensagem.textContent =
        "Senha correta! A porta foi aberta.";

    salvarJogo();
}

let fiosLigados = [];

function iniciarMinigame() {
    fiosLigados = [];

    mensagem.innerHTML = `
        <strong>Ligue os fios na ordem correta:</strong><br>
        <button onclick="ligarFio('vermelho')">Vermelho</button>
        <button onclick="ligarFio('azul')">Azul</button>
        <button onclick="ligarFio('verde')">Verde</button>
    `;
}

function ligarFio(cor) {
    const ordem = [
        "vermelho",
        "azul",
        "verde"
    ];

    fiosLigados.push(cor);

    const posicao =
        fiosLigados.length - 1;

    if (fiosLigados[posicao] !== ordem[posicao]) {
        fiosLigados = [];

        mensagem.textContent =
            "Sequência errada. Tente novamente.";

        return;
    }

    if (fiosLigados.length === ordem.length) {
        estado.minigameConcluido = true;

        diario.registrarPista(
            "Os fios foram ligados corretamente."
        );

        mensagem.textContent =
            "Você ligou os fios corretamente!";

        salvarJogo();
    }
}

function salvarSala() {
    jogo.porao = {
        portaAberta: estado.portaAberta,
        geladeiraAberta: estado.geladeiraAberta,
        chaveEncontrada: estado.chaveEncontrada,
        fiosAbertos: estado.fiosAbertos,
        minigameConcluido: estado.minigameConcluido,
        pistas: diario.pistas
    };
}

function carregarSala() {
    carregarJogo();

    criarObjeto(porta);
    criarObjeto(geladeira);
    criarObjeto(senha);
    criarObjeto(fios);

    if (
        estado.geladeiraAberta &&
        !estado.chaveEncontrada
    ) {
        criarObjeto(chave);
    }

    if (estado.chaveEncontrada)
        adicionarInventario("Chave de fenda");

    desenharSala();
}

carregarSala();