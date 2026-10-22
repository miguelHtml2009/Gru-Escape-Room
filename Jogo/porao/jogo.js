// Localiza o canvas e seu contexto 2D, usado para desenhar a cena.
const sala = document.getElementById("sala");
const context = sala.getContext("2d");

// Localiza os elementos do painel de interação e da interface.
const painelInteracao = document.getElementById("interacao");
const tituloInteracao = document.getElementById("titulo-interacao");
const conteudoInteracao = document.getElementById("conteudo-interacao");
const mensagem = document.getElementById("mensagem");
const inventario = document.getElementById("inventario");

// Guarda o estado da aventura para que as ações dependam do que o jogador já fez.
const estado = {
    geladeiraAberta: false,
    fiosConectados: false,
    portaAberta: false,
    geleiaObtida: false,
    itens: []
};

// A senha de quatro dígitos que abre a porta; altere aqui para escolher outra.
const SENHA_PORTA = "2741";

// Define a cena em coordenadas fixas 800x600. O CSS redimensiona o canvas sem mudar
// essa proporção, então os objetos não ficam esticados quando a janela muda de tamanho.
const imagens = {
    fundo: carregarImagem("../Sprites/parede.png"),
    porta: carregarImagem("../Sprites/porta-fudida.png"),
    geladeira: carregarImagem("../Sprites/geladeira-fechada.png"),
    painel: carregarImagem("../Sprites/senha-porta.png"),
    fios: carregarImagem("../Sprites/fios.png")
};

// Carrega uma imagem e redesenha a sala quando ela estiver pronta.
function carregarImagem(caminho) {
    const imagem = new Image();
    imagem.src = caminho;
    imagem.onload = desenharSala;
    imagem.onerror = function() {
        console.warn("Não foi possível carregar a imagem:", caminho);
        desenharSala();
    };
    return imagem;
}

// Desenha um sprite apenas se ele já terminou de carregar.
function desenharSprite(imagem, x, y, largura, altura) {
    if (imagem && imagem.complete && imagem.naturalWidth > 0) {
        context.drawImage(imagem, x, y, largura, altura);
        return true;
    }
    return false;
}

// Desenha toda a sala em uma única função para manter a cena consistente.
function desenharSala() {
    // Limpa o quadro antes de redesenhar os elementos.
    context.clearRect(0, 0, sala.width, sala.height);

    // Desenha a parede repetida se o sprite existir; caso contrário, usa fundo escuro.
    if (imagens.fundo.complete && imagens.fundo.naturalWidth > 0) {
        const padrao = context.createPattern(imagens.fundo, "repeat");
        if (padrao) {
            context.fillStyle = padrao;
            context.fillRect(0, 0, 800, 600);
        }
    } else {
        context.fillStyle = "#171719";
        context.fillRect(0, 0, 800, 600);
    }

    // Desenha os objetos principais em posições fixas dentro do canvas.
    desenharSprite(imagens.porta, 25, 165, 150, 300);
    desenharSprite(imagens.geladeira, 535, 190, 235, 360);
    desenharSprite(imagens.painel, 220, 95, 115, 115);
    desenharSprite(imagens.fios, 335, 390, 125, 125);

    // Indica visualmente se a geladeira foi destrancada.
    if (estado.geladeiraAberta) {
        context.fillStyle = "rgba(20, 100, 45, 0.25)";
        context.fillRect(535, 190, 235, 360);
        context.fillStyle = "#e7c88b";
        context.font = "16px monospace";
        context.fillText("ABERTA", 600, 570);
    }

    // Indica se a porta já foi aberta.
    if (estado.portaAberta) {
        context.fillStyle = "rgba(20, 100, 45, 0.35)";
        context.fillRect(25, 165, 150, 300);
        context.fillStyle = "#e7c88b";
        context.font = "16px monospace";
        context.fillText("ABERTA", 55, 485);
    }
}

// Abre um painel HTML por cima do canvas e troca seu conteúdo.
function abrirPainel(titulo, conteudoHTML) {
    tituloInteracao.textContent = titulo;
    conteudoInteracao.innerHTML = conteudoHTML;
    painelInteracao.hidden = false;
}

// Fecha o painel sem apagar o progresso do jogo.
function fecharPainel() {
    painelInteracao.hidden = true;
    conteudoInteracao.innerHTML = "";
}

// Atualiza a lista de itens que o jogador já encontrou.
function atualizarInventario() {
    inventario.innerHTML = "";

    if (estado.itens.length === 0) {
        const itemVazio = document.createElement("li");
        itemVazio.textContent = "Vazio";
        inventario.appendChild(itemVazio);
        return;
    }

    estado.itens.forEach(function(item) {
        const linha = document.createElement("li");
        linha.textContent = item;
        inventario.appendChild(linha);
    });
}

// Mostra o minijogo de conexão de fios. Cada seletor precisa receber o símbolo
// correspondente à cor da mesma linha: amarelo/círculo, azul/X, vermelho/triângulo,
// roxo/estrela. Os controles são simples e não exigem arrastar elementos.
function abrirMinijogoFios() {
    if (estado.fiosConectados) {
        abrirPainel("Caixa de fios", `
            <p>Os fios já estão conectados corretamente. A geladeira foi destrancada.</p>
        `);
        return;
    }

    abrirPainel("Conecte os fios", `
        <p>Conecte cada fio ao símbolo igual do outro lado.</p>
        <div class="fios-jogo">
            <div class="fio-linha"><span class="fio-cor" style="background:#f0df38">○</span><strong>Amarelo</strong></div>
            <div class="fio-linha"><label for="fio-amarelo">Conectar a</label>
                <select id="fio-amarelo">
                    <option value="">Escolha</option>
                    <option value="circulo">○ Círculo</option>
                    <option value="xis">X X</option>
                    <option value="triangulo">△ Triângulo</option>
                    <option value="estrela">☆ Estrela</option>
                </select>
            </div>
            <div class="fio-linha"><span class="fio-cor" style="background:#293bff">X</span><strong>Azul</strong></div>
            <div class="fio-linha"><label for="fio-azul">Conectar a</label>
                <select id="fio-azul">
                    <option value="">Escolha</option>
                    <option value="circulo">○ Círculo</option>
                    <option value="xis">X X</option>
                    <option value="triangulo">△ Triângulo</option>
                    <option value="estrela">☆ Estrela</option>
                </select>
            </div>
            <div class="fio-linha"><span class="fio-cor" style="background:#e52b24">△</span><strong>Vermelho</strong></div>
            <div class="fio-linha"><label for="fio-vermelho">Conectar a</label>
                <select id="fio-vermelho">
                    <option value="">Escolha</option>
                    <option value="circulo">○ Círculo</option>
                    <option value="xis">X X</option>
                    <option value="triangulo">△ Triângulo</option>
                    <option value="estrela">☆ Estrela</option>
                </select>
            </div>
            <div class="fio-linha"><span class="fio-cor" style="background:#d62be2">☆</span><strong>Roxo</strong></div>
            <div class="fio-linha"><label for="fio-roxo">Conectar a</label>
                <select id="fio-roxo">
                    <option value="">Escolha</option>
                    <option value="circulo">○ Círculo</option>
                    <option value="xis">X X</option>
                    <option value="triangulo">△ Triângulo</option>
                    <option value="estrela">☆ Estrela</option>
                </select>
            </div>
        </div>
        <p id="resultado-fios" aria-live="polite"></p>
        <button id="verificar-fios" type="button">Verificar conexões</button>
    `);

    // Atribui a ação diretamente ao botão criado no painel, sem addEventListener.
    document.getElementById("verificar-fios").onclick = verificarFios;
}

// Confere se cada fio está ligado ao símbolo certo e libera a geladeira ao acertar.
function verificarFios() {
    const conexoes = {
        amarelo: document.getElementById("fio-amarelo").value,
        azul: document.getElementById("fio-azul").value,
        vermelho: document.getElementById("fio-vermelho").value,
        roxo: document.getElementById("fio-roxo").value
    };

    // Cada cor tem uma única conexão correta.
    const correto =
        conexoes.amarelo === "circulo" &&
        conexoes.azul === "xis" &&
        conexoes.vermelho === "triangulo" &&
        conexoes.roxo === "estrela";

    const resultado = document.getElementById("resultado-fios");

    if (correto) {
        estado.fiosConectados = true;
        estado.geladeiraAberta = true;
        resultado.textContent = "Conexões corretas! Você ouviu a trava da geladeira abrir.";
        mensagem.textContent = "A caixa de fios está funcionando. A geladeira foi destrancada.";
        desenharSala();

        // Mantém a mensagem de sucesso visível dentro do painel até o jogador fechar.
        document.getElementById("verificar-fios").disabled = true;
    } else {
        resultado.textContent = "Ainda está errado. Confira os símbolos e tente novamente.";
    }
}

// Abre o painel numérico da porta e confere a senha digitada.
function abrirPainelSenha() {
    if (estado.portaAberta) {
        abrirPainel("Porta", "<p>A porta já está aberta. Você pode sair do porão.</p>");
        return;
    }

    let senhaDigitada = "";

    abrirPainel("Painel de senha", `
        <p>Digite a senha de quatro dígitos para destrancar a porta.</p>
        <output id="visor-senha" aria-live="polite">____</output>
        <div class="teclado">
            <button type="button" data-numero="1">1</button>
            <button type="button" data-numero="2">2</button>
            <button type="button" data-numero="3">3</button>
            <button type="button" data-numero="4">4</button>
            <button type="button" data-numero="5">5</button>
            <button type="button" data-numero="6">6</button>
            <button type="button" data-numero="7">7</button>
            <button type="button" data-numero="8">8</button>
            <button type="button" data-numero="9">9</button>
            <button type="button" data-acao="limpar">Limpar</button>
            <button type="button" data-numero="0">0</button>
            <button type="button" data-acao="apagar">Apagar</button>
        </div>
        <p id="resultado-senha" aria-live="polite"></p>
        <button id="confirmar-senha" type="button">Confirmar</button>
    `);

    // Mostra os dígitos selecionados sem permitir mais de quatro números.
    const visor = document.getElementById("visor-senha");
    const resultado = document.getElementById("resultado-senha");

    // Usa delegação pelo onclick do contêiner para tratar todos os botões numéricos.
    document.querySelector(".teclado").onclick = function(evento) {
        const botao = evento.target.closest("button");
        if (!botao) return;

        if (botao.dataset.numero !== undefined && senhaDigitada.length < 4) {
            senhaDigitada += botao.dataset.numero;
        } else if (botao.dataset.acao === "limpar") {
            senhaDigitada = "";
        } else if (botao.dataset.acao === "apagar") {
            senhaDigitada = senhaDigitada.slice(0, -1);
        }

        visor.textContent = senhaDigitada.padEnd(4, "_");
    };

    // Compara a senha digitada com a senha configurada no início do arquivo.
    document.getElementById("confirmar-senha").onclick = function() {
        if (senhaDigitada.length !== 4) {
            resultado.textContent = "Digite os quatro números.";
            return;
        }

        if (senhaDigitada === SENHA_PORTA) {
            estado.portaAberta = true;
            mensagem.textContent = "A porta se abriu. Você conseguiu escapar do porão.";
            resultado.textContent = "Senha correta. A porta foi destrancada!";
            desenharSala();
        } else {
            resultado.textContent = "Senha incorreta. Tente novamente.";
            senhaDigitada = "";
            visor.textContent = "____";
        }
    };
}

// Abre a geladeira somente depois do minijogo e permite pegar a geleia vermelha.
function interagirGeladeira() {
    if (!estado.geladeiraAberta) {
        abrirPainel("Geladeira trancada", `
            <p>A geladeira não abre. Parece que a caixa de fios controla a trava.</p>
            <button id="ir-fios" type="button">Examinar caixa de fios</button>
        `);
        document.getElementById("ir-fios").onclick = abrirMinijogoFios;
        return;
    }

    if (estado.geleiaObtida) {
        abrirPainel("Geladeira", "<p>A geladeira está aberta, mas você já pegou a geleia vermelha.</p>");
        return;
    }

    abrirPainel("Dentro da geladeira", `
        <p>Entre os potes gelados, você encontra um pote de geleia vermelha.</p>
        <button id="pegar-geleia" type="button">Pegar geleia vermelha</button>
    `);

    // Adiciona o item ao inventário apenas uma vez.
    document.getElementById("pegar-geleia").onclick = function() {
        estado.geleiaObtida = true;
        estado.itens.push("Geleia vermelha");
        atualizarInventario();
        mensagem.textContent = "Você pegou a geleia vermelha. Para que será que ela serve?";
        abrirPainel("Item encontrado", "<p>Geleia vermelha adicionada ao inventário.</p>");
    };
}

// Exibe as pistas encontradas até agora.
function abrirDiario() {
    const pistaFios = estado.fiosConectados
        ? "Os fios foram conectados corretamente."
        : "A caixa de fios parece controlar a trava da geladeira.";
    const pistaPorta = estado.portaAberta
        ? "A porta está destrancada."
        : "O painel da porta exige uma senha de quatro dígitos.";

    abrirPainel("Diário de pistas", `
        <ul>
            <li>${pistaFios}</li>
            <li>${pistaPorta}</li>
            <li>${estado.geleiaObtida ? "Você encontrou a geleia vermelha." : "Há algo dentro da geladeira."}</li>
        </ul>
    `);
}

// Converte a posição do clique na tela para as coordenadas internas 800x600 do canvas.
function obterPosicaoCanvas(evento) {
    const retangulo = sala.getBoundingClientRect();
    return {
        x: (evento.clientX - retangulo.left) * sala.width / retangulo.width,
        y: (evento.clientY - retangulo.top) * sala.height / retangulo.height
    };
}

// Trata os cliques nos objetos da sala com áreas clicáveis independentes dos sprites.
sala.onclick = function(evento) {
    const posicao = obterPosicaoCanvas(evento);
    const x = posicao.x;
    const y = posicao.y;

    // A geladeira fica na região direita da cena.
    if (x >= 520 && x <= 790 && y >= 170 && y <= 570) {
        interagirGeladeira();
        return;
    }

    // O painel de senha fica na região superior esquerda/central.
    if (x >= 200 && x <= 350 && y >= 75 && y <= 230) {
        abrirPainelSenha();
        return;
    }

    // A caixa de fios fica na região central inferior.
    if (x >= 320 && x <= 475 && y >= 360 && y <= 535) {
        abrirMinijogoFios();
        return;
    }

    // A porta também pode ser clicada para verificar se já foi aberta.
    if (x >= 15 && x <= 190 && y >= 140 && y <= 490) {
        if (estado.portaAberta) {
            abrirPainel("Você escapou!", "<p>Você atravessou a porta e saiu do porão. Fim de jogo.</p>");
        } else {
            abrirPainel("Porta trancada", "<p>A porta está trancada. O painel ao lado deve ter a senha.</p>");
        }
    }
};

// Liga o botão de fechar ao método que esconde o painel.
document.getElementById("fechar").onclick = fecharPainel;

// Liga o botão do diário à função que monta a lista de pistas.
document.getElementById("abrir-diario").onclick = abrirDiario;

// Desenha a primeira cena e deixa o inventário em seu estado inicial.
atualizarInventario();
desenharSala();
