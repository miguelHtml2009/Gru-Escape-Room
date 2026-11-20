
// Função para salvar o progresso sem apagar dados de outras salas
function save() {
    const dadosAntigos = JSON.parse(localStorage.getItem("escapeRoomProgresso")) || {};

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
    //Restaura a condição do telefone atendido (se ele existir na pagina)
    if (progresso.telefoneAtendido === true && typeof telefoneAtendido !== 'undefined'){
        telefoneAtendido = true;
    }
    //Restaurar a condição dos parafusos desparafusados (Se o elemento existir na página)
    if(typeof contp !== 'undefined'){ //Se tiver contp na página
        contp = 0; // Zera o elemento e façamos a contagem por meio do estado "solto"
        if (progresso.p1Solto) { 
            document.getElementById("p1").style.display = "none"; 
            document.getElementById("p1").classList.add("solto");
            contp++; 
        }
        if (progresso.p2Solto) { 
            document.getElementById("p2").style.display = "none"; 
            document.getElementById("p2").classList.add("solto");
            contp++; 
        }
        if (progresso.p3Solto) { 
            document.getElementById("p3").style.display = "none"; 
            document.getElementById("p3").classList.add("solto");
            contp++; 
        }
        if (progresso.p4Solto) { 
            document.getElementById("p4").style.display = "none"; 
            document.getElementById("p4").classList.add("solto");
            contp++; 
        }
        if(progresso.tampaAberta === true && typeof tampaAberta !== 'undefined'){
            tampaAberta = true;
        }
        if(typeof tampaAberta !== 'undefined' && tampaAberta === true){
            if (painelfios.Fechado) painelfios.Fechado.style.display = "none";
            if (painelfios.Parafusado) painelfios.Parafusado.style.display = "none";
            if (painelfios.Abertomin) painelfios.Abertomin.style.display = "block";
            if (painelfios.Abertomax) painelfios.Abertomax.style.display = "none";
        } else{
            if (painelfios.Fechado) painelfios.Fechado.style.display = "block";
            if (painelfios.Parafusado) painelfios.Parafusado.style.display = "block";
            if (painelfios.Abertomin) painelfios.Abertomin.style.display = "none";
            if (painelfios.Abertomax) painelfios.Abertomax.style.display = "none";
        }
    }
    
    if(typeof fios!== 'undefined'){
        //Se o fio existir na página e estiver solto, atualizamos todos os elementos, um pra cada cor
        if(progresso.fioAmareloSolto === false){
            fios.amarelo.solto = false;

            fios.amarelo.esquerda.style.display = "none";
            fios.amarelo.direita.style.display = "none";
            fios.amarelo.conectado.style.display = "block";
        }
        if(progresso.fioAzulSolto === false){
            fios.azul.solto = false;

            fios.azul.esquerda.style.display = "none";
            fios.azul.direita.style.display = "none";
            fios.azul.conectado.style.display = "block";
        }
        if(progresso.fioRosaSolto === false){
            fios.rosa.solto = false;

            fios.rosa.esquerda.style.display = "none";
            fios.rosa.direita.style.display = "none";
            fios.rosa.conectado.style.display = "block";
        }
        if(progresso.fioVermelhoSolto === false){
            fios.vermelho.solto = false;

            fios.vermelho.esquerda.style.display = "none";
            fios.vermelho.direita.style.display = "none";
            fios.vermelho.conectado.style.display = "block";
        }

        if(fios.amarelo.solto === false && fios.azul.solto === false && fios.rosa.solto === false && fios.vermelho.solto === false){
            //Se todos fios estiverem conectados, deixa tudo já certo
            if(document.getElementById("fios-parafusados")) document.getElementById("fios-parafusados").style.display = "none";
            if(document.getElementById("fios-fechados")) document.getElementById("fios-fechados").style.display = "none";

            if (painelfios.Fechado) painelfios.Fechado.style.display = "none";
            if (painelfios.Abertomin) painelfios.Abertomin.style.display = "none";
            
            if (painelfios.Conectado) painelfios.Conectado.style.display = "block";

            localStorage.setItem("energia", "true");
        }
    }

}
// Executa o carregamento ao abrir a página
    window.onload = function() {
        carregarProgresso();
};