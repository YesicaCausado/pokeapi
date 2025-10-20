function Batalla() {
  const root = document.getElementById("root");
  root.innerHTML = `
    <h1>Batalla Pokémon</h1>
    <div class="selectors">
      <label for="pokemon1">Pokémon 1:</label>
      <select id="pokemon1"></select>

      <label for="pokemon2">Pokémon 2:</label>
      <select id="pokemon2"></select>

      <button onclick="iniciarBatalla()">Iniciar Batalla</button>
    </div>
    <div id="batalla-resultados"></div>
  `;

  cargarPokemonLista();
}

const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

async function cargarPokemonLista() {
  try {
    const res = await fetch(`${apiUrl}?limit=151`);
    const data = await res.json();
    const lista = data.results;

    const select1 = document.getElementById("pokemon1");
    const select2 = document.getElementById("pokemon2");

    lista.forEach(poke => {
      const option1 = document.createElement("option");
      const option2 = document.createElement("option");
      option1.value = option2.value = poke.name;
      option1.textContent = option2.textContent = poke.name.toUpperCase();
      select1.appendChild(option1);
      select2.appendChild(option2);
    });

    // Selecciones predeterminadas
    select1.value = "pikachu";
    select2.value = "charmander";
  } catch (error) {
    alert("Error al cargar la lista de Pokémon.");
  }
}

async function getPokemon(nombre) {
  try {
    const res = await fetch(apiUrl + nombre.toLowerCase());
    if (!res.ok) throw new Error("No encontrado");
    return await res.json();
  } catch (error) {
    alert(`Error al cargar ${nombre}: ${error.message}`);
    return null;
  }
}

function obtenerStat(pokemon, statName) {
  const stat = pokemon.stats.find(s => s.stat.name === statName);
  return stat ? stat.base_stat : 0;
}

function simularBatalla(p1, p2) {
  const p1Ataque = obtenerStat(p1, "attack");
  const p1Defensa = obtenerStat(p1, "defense");
  const p1Velocidad = obtenerStat(p1, "speed");
  const p1HP = obtenerStat(p1, "hp");

  const p2Ataque = obtenerStat(p2, "attack");
  const p2Defensa = obtenerStat(p2, "defense");
  const p2Velocidad = obtenerStat(p2, "speed");
  const p2HP = obtenerStat(p2, "hp");

  let hp1 = p1HP;
  let hp2 = p2HP;
  let log = [];

  let turno = 1;
  let atacante, defensor;
  const primero = p1Velocidad >= p2Velocidad ? 1 : 2;

  while (hp1 > 0 && hp2 > 0 && turno <= 10) {
    if ((turno % 2 === 1 && primero === 1) || (turno % 2 === 0 && primero === 2)) {
      atacante = { nombre: p1.name, ataque: p1Ataque };
      defensor = { nombre: p2.name, defensa: p2Defensa };
      let daño = Math.max(10, atacante.ataque - defensor.defensa / 2);
      hp2 -= daño;
      log.push(`${atacante.nombre} ataca y causa ${Math.round(daño)} de daño a ${defensor.nombre}`);
    } else {
      atacante = { nombre: p2.name, ataque: p2Ataque };
      defensor = { nombre: p1.name, defensa: p1Defensa };
      let daño = Math.max(10, atacante.ataque - defensor.defensa / 2);
      hp1 -= daño;
      log.push(`${atacante.nombre} ataca y causa ${Math.round(daño)} de daño a ${defensor.nombre}`);
    }
    turno++;
  }

  let ganador;
  if (hp1 <= 0 && hp2 <= 0) ganador = "Empate";
  else if (hp1 > hp2) ganador = p1.name.toUpperCase();
  else ganador = p2.name.toUpperCase();

  return { log, ganador, hp1, hp2 };
}

async function iniciarBatalla() {
  const nombre1 = document.getElementById("pokemon1").value;
  const nombre2 = document.getElementById("pokemon2").value;
  const resultDiv = document.getElementById("batalla-resultados");

  resultDiv.innerHTML = "Cargando datos...";

  const [poke1, poke2] = await Promise.all([
    getPokemon(nombre1),
    getPokemon(nombre2)
  ]);

  if (!poke1 || !poke2) {
    resultDiv.innerHTML = "";
    return;
  }

  const { log, ganador, hp1, hp2 } = simularBatalla(poke1, poke2);

  resultDiv.innerHTML = `
    <h2>Resultado de la batalla</h2>
    <div class="batalla-cards">
      <div class="card ${ganador === poke1.name.toUpperCase() ? 'ganador' : ''}">
        <h3>${poke1.name.toUpperCase()}</h3>
        <img src="${poke1.sprites.front_default}" alt="${poke1.name}" />
        <p>HP restante: ${Math.max(0, Math.round(hp1))}</p>
      </div>
      <div class="card ${ganador === poke2.name.toUpperCase() ? 'ganador' : ''}">
        <h3>${poke2.name.toUpperCase()}</h3>
        <img src="${poke2.sprites.front_default}" alt="${poke2.name}" />
        <p>HP restante: ${Math.max(0, Math.round(hp2))}</p>
      </div>
    </div>
    <h3>🏆 Ganador: ${ganador}</h3>
    <h4>Resumen de combate:</h4>
    <ul class="log-combate">${log.map(p => `<li>${p}</li>`).join("")}</ul>
  `;
}
