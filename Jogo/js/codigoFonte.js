const mensagem = document.getElementById("mensagem");
const inventario = document.getElementById("inventario");
const palco = document.getElementById("palco");
const canvas = document.getElementById("sala");
const ctx = canvas.getContext("2d");

let jogo = JSON.parse(localStorage.getItem("saveJogo")) || {
    porao: {
        portaAberta: false,
        geladeiraAberta: false,
        chaveEncontrada: false,
        fiosAbertos: false,
        minigameConcluido: false,
        pistas: []
    }
};

const diario = {
    aberto: false,
    pistas: [],

    abrir() {
        this.aberto = !this.aberto;
        desenharSala();
    },

    registrarPista(pista) {
        if (!this.pistas.includes(pista))
            this.pistas.push(pista);

        salvarJogo();
        desenharSala();
    },

    desenhar() {
        if (!this.aberto) return;

        ctx.fillStyle = "#eee";
        ctx.fillRect(100, 30, 600, 550);

        ctx.fillStyle = "#111";
        ctx.font = "28px Arial";
        ctx.fillText("Diário de pistas", 260, 70);

        ctx.font = "18px Arial";

        let y = 110;

        this.pistas.forEach((pista, i) => {
            ctx.fillText(`${i + 1}. ${pista}`, 140, y);
            y += 35;
        });
    }
};

function salvarJogo() {
    if (typeof salvarSala === "function")
        salvarSala();

    jogo.porao.pistas = diario.pistas;

    localStorage.setItem(
        "saveJogo",
        JSON.stringify(jogo)
    );
}

function carregarJogo() {
    diario.pistas = jogo.porao.pistas || [];
}

function salvarESair() {
    salvarJogo();

    window.location.href =
        "../../inicializacao/menu_principal/index.html";
}

function abrirMenu() {
    document.getElementById("menu-pausa").hidden = false;
}

function fecharMenu() {
    document.getElementById("menu-pausa").hidden = true;
}

function criarObjeto(objeto) {
    if (document.getElementById(objeto.id))
        return;

    const elemento = document.createElement("img");

    elemento.id = objeto.id;
    elemento.src = objeto.imagem;
    elemento.style.position = "absolute";
    elemento.style.left = objeto.x + "px";
    elemento.style.top = objeto.y + "px";
    elemento.style.width = objeto.largura + "px";
    elemento.style.height = objeto.altura + "px";
    elemento.style.cursor = "pointer";

    elemento.onclick = objeto.onclick;

    palco.appendChild(elemento);
}

function removerObjeto(id) {
    const objeto = document.getElementById(id);

    if (objeto)
        objeto.remove();
}

function adicionarInventario(nome) {
    const vazio = inventario.querySelector("li");

    if (vazio && vazio.textContent === "Vazio")
        vazio.remove();

    const item = document.createElement("li");
    item.textContent = nome;

    inventario.appendChild(item);
}

function limparInventario() {
    inventario.innerHTML = "";
}

function desenharSala() {
    const fundo = new Image();

    fundo.src = "../../Sprites/parede.png";

    fundo.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(
            fundo,
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.fillStyle = "#66b2b2";
        ctx.fillRect(0, 570, 800, 150);

        diario.desenhar();
    };
}