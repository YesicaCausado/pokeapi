// --- Variables globales ---
const totalPokes = 151; // Cambia este valor según el número total que uses
// Usar el array global compartido `window.pokemones` si ya existe (definido en conexion.js)
window.pokemones = window.pokemones || [];
let misNumeros = JSON.parse(localStorage.getItem("misNumeros")) || [];

// Normalizar misNumeros: eliminar duplicados y valores fuera de rango
misNumeros = Array.from(new Set(misNumeros.filter(n => Number.isInteger(n) && n >= 1 && n <= totalPokes)));

// --- Cargar los nombres de los pokémon desde la PokeAPI ---
async function cargarPokemones() {
  const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${totalPokes}`);
  const data = await respuesta.json();
  window.pokemones = data.results;
  Capturados(); // Mostrar la vista inicial
}

// --- Mostrar el álbum con todas las cajas ---
function Capturados() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  // Contador
  const contador = document.createElement("p");
  contador.id = "contador";
  contador.textContent = `${misNumeros.length} / ${totalPokes}`;

  // Botón para generar 4 nuevos pokémon
  const boton = document.createElement("button");
  boton.textContent = "Capturar 4 nuevos Pokémon";
  boton.addEventListener("click", Aleatorios);

  // Sección donde aparecerán los nuevos capturados
  const nuevos = document.createElement("section");
  nuevos.classList.add("c-lista");
  nuevos.id = "nuevos";

  // Sección principal con todas las cajas
  const seccioncapturados = document.createElement("section");
  seccioncapturados.classList.add("c-lista");

  // Crear las cajas del álbum
  for (let i = 1; i <= totalPokes; i++) {
    const div = document.createElement("div");
    div.classList.add("c-unpoke");
    div.id = "c-unpoke-" + i;

    if (misNumeros.includes(i)) {
      div.classList.add("c-mios-pokemon");
      div.innerHTML = `
        <div onclick="Detalle(${i})">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png" alt="${window.pokemones[i-1]?.name}">
          <p>${i}</p>
        </div>
      `;
    } else {
      // caja vacía (estética: la clase c-unpoke se puede usar para pintar en negro)
      div.innerHTML = "";
      div.classList.add('c-empty');
    }

    seccioncapturados.appendChild(div);
  }

  // Añadir todo al root
  root.appendChild(contador);
  root.appendChild(boton);
  root.appendChild(nuevos);
  root.appendChild(seccioncapturados);
}

// --- Generar 4 pokémon aleatorios ---
function Aleatorios() {
  const nuevosEl = document.getElementById("nuevos");
  if (!nuevosEl) return;
  nuevosEl.innerHTML = "";

  if (misNumeros.length >= totalPokes) {
    nuevosEl.innerHTML = `<p>Ya has capturado todos los Pokémon.</p>`;
    return;
  }

  const vistos = new Set();
  const tarjetas = [];

  while (vistos.size < 4 && vistos.size < (totalPokes - misNumeros.length)) {
    const num = Math.floor(Math.random() * totalPokes) + 1;
    if (misNumeros.includes(num) || vistos.has(num)) continue;
    vistos.add(num);

    const name = window.pokemones[num - 1]?.name || "";
    tarjetas.push({ num, name });
  }

  let pokesAleatorios = "";
  tarjetas.forEach(t => {
    pokesAleatorios += `
      <div class="c-lista-pokemon c-un_aleatorio">
        <p>#${t.num}</p>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${t.num}.png" alt="${t.name}">
        <p>${t.name}</p>
        <button class="guardar" data-num="${t.num}">Guardar</button>
      </div>`;

    // actualizar inmediatamente la caja del álbum
    const caja = document.getElementById("c-unpoke-" + t.num);
    if (caja && !caja.classList.contains('c-mios-pokemon')) {
      caja.classList.add("c-mios-pokemon");
      caja.innerHTML = `
        <div onclick="Detalle(${t.num})">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${t.num}.png" alt="${t.name}">
          <p>${t.num}</p>
        </div>`;
    }
  });

  nuevosEl.innerHTML = pokesAleatorios;
  document.getElementById("contador").textContent = `${misNumeros.length} / ${totalPokes}`;

  // Añadir handlers para botones Guardar
  nuevosEl.querySelectorAll('button.guardar').forEach(btn => {
    btn.addEventListener('click', () => {
      const num = Number(btn.getAttribute('data-num'));
      if (!misNumeros.includes(num)) {
        misNumeros.push(num);
        localStorage.setItem("misNumeros", JSON.stringify(misNumeros));
        document.getElementById("contador").textContent = `${misNumeros.length} / ${totalPokes}`;
      }
      btn.disabled = true;
      btn.textContent = 'Guardado';
    });
  });
}

// --- Iniciar ---
cargarPokemones();

// Exponer funciones para el nav
window.Capturados = Capturados;
window.Aleatorios = Aleatorios;
