// Usar almacenamiento global compartido para evitar redeclaraciones
window.pokemones = window.pokemones || [];
window.totalPokes = (typeof window.totalPokes !== 'undefined') ? window.totalPokes : 6;

// Conexión para obtener la lista de Pokémon
async function conexionLista(filtrotipo) {

  
  if(filtrotipo == "All"){
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${window.totalPokes}`);
    const data = await res.json();
    return data.results;
  }else{
    const res = await fetch(`https://pokeapi.co/api/v2/type/${filtrotipo}`);
    const data = await res.json();

    const pokemonesTipo = [];
    for (let i = 0; i < data.pokemon.length; i++) {
      pokemonesTipo.push(data.pokemon[i].pokemon);
    }
    return pokemonesTipo;
  }

}

// Cargar todos los Pokémon al iniciar
async function General() {
  if (window.pokemones.length === 0) {
    window.pokemones = await conexionLista("All");
  }
  if (typeof Home === 'function') Home();
}

General()

async function FiltroConexion(Elfiltro){
  document.getElementById("la-lista").innerHTML = "";
  window.pokemones = await conexionLista(Elfiltro);
  const listaHTML = generarLista(window.pokemones);
  document.getElementById("la-lista").innerHTML = listaHTML;
}

// Exponer funciones globales mínimas
window.General = General;
window.FiltroConexion = FiltroConexion;