const Monster = {
    Elemento: document.getElementById("Monster"),
    Coletado: false,
}
function ColetarMonster(){
    Monster.Coletado = true;
    Monster.Elemento.hidden = true;
}