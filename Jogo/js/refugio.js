let energia = localStorage.getItem("energia") === "true";
const cenarioEmergencia = document.getElementById("cenario-emergencia");
const textoMensagem = document.getElementById("mensagem");

const progressoSalvo = JSON.parse(localStorage.getItem("escapeRoomProgresso")) || {};
let falaNefario = progressoSalvo.falaNefario || 0;

const QuadroRobert = {
    elemento: document.getElementById("Robert"),
}

function estadoEnergia() {
    if (energia) {
        cenarioEmergencia.classList.add("energia-ativa");
        textoMensagem.textContent = "Você abriu a porta";
        save();
    } else {
        textoMensagem.textContent = "Não há energia, o sistema parece em um estado de lockdown";
    }
}

function perguntar() {
    const temMonsterNoInventario = document.getElementById("item-Monster") !== null;

    if (falaNefario === 0) {
        textoMensagem.textContent = "Dr. Nefário: Ah, finalmente! Pensei que ia ficar trancado nessa lata de sardinha por milênios!";
        falaNefario = 1;
        save();
    } else if (falaNefario === 1) {
        textoMensagem.textContent = "Você: Eu te salvei! Agora vê se me ajuda a fugir, como eu jogo aquele fliperama?";
        falaNefario = 2;
        save();
    } else if (falaNefario === 2 && temMonsterNoInventario) {
        textoMensagem.textContent = "Dr. Nefário: Isso serve, na verdade, sempre vi o Gru juntando Monster com esse Reagente... NOSSA PROVA UM POUQUINHO ";
        removerItem("Monster");
        MonsterInsano();
        falaNefario = 3;
        save();
    } else if (falaNefario === 3) {
        textoMensagem.textContent = "Dr. Nefário: Já te dei a dica, agora corre antes que o Gru apareça!";
    } else {
        textoMensagem.textContent = "Dr. Nefário: Sem cafeína meu cerébro não funciona...";
    }
}
function MonsterInsano(){
    document.body.classList.add("efeito-monster");
    QuadroRobert.elemento.hidden = false;
    setTimeout(function () {
        document.body.classList.remove("efeito-monster");
    }, 8000);
}