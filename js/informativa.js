function Informativa(){
        const root = document.getElementById('root');
        if (!root) return;

                // Generar un póster SVG programático (estilizado, original) y evitar usar imágenes con derechos
                const id = 25;
                const name = 'Pikachu';
                const posterSVG = encodeURIComponent(`
                    <svg xmlns='http://www.w3.org/2000/svg' width='800' height='1200' viewBox='0 0 800 1200'>
                        <defs>
                            <linearGradient id='g1' x1='0' x2='0' y1='0' y2='1'>
                                <stop offset='0' stop-color='#071029'/>
                                <stop offset='1' stop-color='#081521'/>
                            </linearGradient>
                            <linearGradient id='titleGrad' x1='0' x2='1'>
                                <stop offset='0' stop-color='#fff59d'/>
                                <stop offset='0.45' stop-color='#ffd54f'/>
                                <stop offset='1' stop-color='#ff8a65'/>
                            </linearGradient>
                            <radialGradient id='g2' cx='50%' cy='30%' r='60%'>
                                <stop offset='0' stop-color='#fff8e1'/>
                                <stop offset='1' stop-color='#ffcc80'/>
                            </radialGradient>
                            <filter id='glow' x='-50%' y='-50%' width='200%' height='200%'>
                                <feGaussianBlur stdDeviation='6' result='b' />
                                <feMerge>
                                    <feMergeNode in='b'/>
                                    <feMergeNode in='SourceGraphic'/>
                                </feMerge>
                            </filter>
                        </defs>
                        <rect width='100%' height='100%' fill='url(#g1)' />

                        <!-- sutil pattern decorativo -->
                        <g opacity='0.06' fill='#fff'>
                            <circle cx='100' cy='160' r='36' />
                            <circle cx='700' cy='140' r='28' />
                            <circle cx='440' cy='720' r='56' />
                            <rect x='40' y='980' width='720' height='20' rx='10' />
                        </g>

                        <!-- título POKÉMON con gradiente, trazo y glow -->
                        <text x='50%' y='120' text-anchor='middle' font-family='Poppins, Verdana, Arial' font-size='108' fill='url(#titleGrad)' font-weight='900' style='letter-spacing:6px; text-transform:uppercase' filter='url(#glow)' stroke='#00000055' stroke-width='3'>
                            POKÉMON
                        </text>
                        <!-- sombra secundaria para profundidad -->
                        <text x='50%' y='134' text-anchor='middle' font-family='Poppins, Verdana, Arial' font-size='108' fill='#00000011' font-weight='900' style='letter-spacing:6px; text-transform:uppercase' >
                            POKÉMON
                        </text>

                        <!-- pokéball grande central con degradados -->
                        <g transform='translate(200,220) scale(1.6)'>
                            <defs>
                                <linearGradient id='pbTop' x1='0' x2='0' y1='0' y2='1'>
                                    <stop offset='0' stop-color='#fff' />
                                    <stop offset='1' stop-color='#f3f3f3' />
                                </linearGradient>
                                <linearGradient id='pbRed' x1='0' x2='0' y1='0' y2='1'>
                                    <stop offset='0' stop-color='#ff6b6b'/>
                                    <stop offset='1' stop-color='#e53935'/>
                                </linearGradient>
                            </defs>
                            <circle cx='150' cy='260' r='150' fill='url(#pbTop)' stroke='#00000011' stroke-width='4' />
                            <path d='M0 260 a150 150 0 0 1 300 0' fill='url(#pbRed)' />
                            <rect x='0' y='250' width='300' height='22' rx='6' fill='#111' />
                            <circle cx='150' cy='260' r='42' fill='#fff' stroke='#00000022' stroke-width='4' />
                            <circle cx='150' cy='260' r='22' fill='#111' />
                        </g>

                        <!-- Siluetas estilizadas (formas abstractas) -->
                        <g transform='translate(420,420)'>
                            <ellipse cx='0' cy='100' rx='86' ry='130' fill='url(#g2)' opacity='0.96' />
                            <ellipse cx='140' cy='120' rx='72' ry='102' fill='#90caf9' opacity='0.9' />
                            <ellipse cx='-140' cy='120' rx='64' ry='92' fill='#a5d6a7' opacity='0.9' />
                        </g>

                        <!-- destellos decorativos -->
                        <g fill='#fff9c4' opacity='0.95' transform='translate(520,60)'>
                            <polygon points='0,8 6,12 0,16 -6,12' transform='scale(2)' opacity='0.9' />
                            <polygon points='40,10 46,14 40,18 34,14' transform='scale(1.2)' opacity='0.8' />
                        </g>

                        <!-- footer text -->
                        <text x='50%' y='1120' text-anchor='middle' font-family='Poppins, Verdana, Arial' font-size='20' fill='#d1e8ff'>Explora, captura y colecciona — Tu Poké Álbum</text>
                    </svg>
                `);
                const posterDataUrl = `data:image/svg+xml;utf8,${posterSVG}`;

            root.innerHTML = `
                <section class="banner">
                    <img class="banner-img" src="${posterDataUrl}" alt="Portada Pikemon">
                    <div class="banner-content">
                        <h1>Bienvenido a tu Poké Álbum</h1>
                        <p>Explora, captura y colecciona tus Pokémon favoritos. Esta es la portada informativa de la app.</p>
                        <div class="banner-actions">
                            <button id="btn-ver-detalle" class="guardar">Ver detalle</button>
                            <button id="btn-capturar-banner" class="guardar">Capturar</button>
                        </div>
                    </div>
                </section>
            `;

        const btnDetalle = document.getElementById('btn-ver-detalle');
        const btnCapturar = document.getElementById('btn-capturar-banner');

        if (btnDetalle) btnDetalle.addEventListener('click', () => {
            if (typeof window.Detalle === 'function') window.Detalle(id);
            else alert(`Has seleccionado a ${name} (#${id})`);
        });

        if (btnCapturar) btnCapturar.addEventListener('click', () => {
            const clave = 'misNumeros';
            let lista = JSON.parse(localStorage.getItem(clave)) || [];
            if (!lista.includes(id)) {
                lista.push(id);
                localStorage.setItem(clave, JSON.stringify(lista));
                // refrescar vista del álbum si existe
                if (typeof window.Capturados === 'function') window.Capturados();
                btnCapturar.textContent = 'Capturado';
                btnCapturar.disabled = true;
            } else {
                btnCapturar.textContent = 'Ya capturado';
                btnCapturar.disabled = true;
            }
        });
    
            // Collage de pokémon: generar y mostrar
                async function generarCollage() {
                const max = (typeof window.totalPokes !== 'undefined') ? window.totalPokes : 151;
                const seleccion = new Set();
                while (seleccion.size < 6) {
                    const n = Math.floor(Math.random() * max) + 1;
                    seleccion.add(n);
                }
                const ids = Array.from(seleccion);
                    const listaCapturados = JSON.parse(localStorage.getItem('misNumeros')) || [];

                    const collageHTML = ids.map((num, i) => {
                        const nameUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${num}.png`;
                        const rot = (i % 2 === 0) ? -6 + i : 6 - i;
                        const scale = 0.9 + (i % 3) * 0.08;
                        const isCaptured = listaCapturados.includes(num);
                        return `<div class="collage-item ${isCaptured ? 'captured' : ''}" data-id="${num}" style="transform: rotate(${rot}deg) scale(${scale}); z-index:${10 - i}">
                                <img src="${nameUrl}" alt="#${num}" title="Cargando...">
                                <span class="collage-id">#${num}</span>
                                ${isCaptured ? '<span class="captured-badge">✔</span>' : ''}
                            </div>`;
                    }).join('');

                    const collageWrap = document.getElementById('collage-wrap');
                    if (collageWrap) collageWrap.innerHTML = collageHTML;

                    // Obtener nombres y actualizar tooltips (paralelo)
                    ids.forEach(async num => {
                        try {
                            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
                            if (!res.ok) return;
                            const data = await res.json();
                            const img = document.querySelector(`#collage-wrap .collage-item[data-id='${num}'] img`);
                            if (img) img.setAttribute('title', data.name || `#${num}`);
                        } catch (e) { /* ignore */ }
                    });

                    // Añadir listener de click delegado para abrir modal
                    if (collageWrap) {
                        collageWrap.addEventListener('click', (ev) => {
                            const item = ev.target.closest('.collage-item');
                            if (!item) return;
                            const num = Number(item.getAttribute('data-id'));
                            const name = item.querySelector('img')?.getAttribute('title') || `#${num}`;
                            openCollageModal(num, name);
                        });
                    }
            }

            // crear contenedor de collage si no existe
            if (!document.getElementById('collage-section')) {
                const nodo = document.createElement('section');
                nodo.id = 'collage-section';
                nodo.innerHTML = `
                    <h2 style="text-align:center;margin-top:18px">Collage destacado</h2>
                    <div id="collage-controls" style="display:flex;gap:8px;justify-content:center;margin-bottom:12px">
                        <button id="collage-regenerar" class="guardar">Regenerar collage</button>
                        <button id="collage-capturar" class="guardar">Capturar todos</button>
                    </div>
                    <div id="collage-wrap" class="collage"></div>
                `;
                root.appendChild(nodo);

                document.getElementById('collage-regenerar').addEventListener('click', generarCollage);
                document.getElementById('collage-capturar').addEventListener('click', () => {
                    const imgs = document.querySelectorAll('#collage-wrap .collage-item img');
                    const lista = JSON.parse(localStorage.getItem('misNumeros')) || [];
                    imgs.forEach(img => {
                        const src = img.getAttribute('src');
                        const match = src.match(/\/(\d+)\.png$/);
                        if (match) {
                            const id = Number(match[1]);
                            if (!lista.includes(id)) lista.push(id);
                        }
                    });
                    localStorage.setItem('misNumeros', JSON.stringify(lista));
                    if (typeof window.Capturados === 'function') window.Capturados();
                });

                generarCollage();
            }

        // Modal open function
        function openCollageModal(id, name) {
            // crear modal si no existe
            let modal = document.getElementById('collage-modal');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'collage-modal';
                modal.className = 'modal';
                modal.innerHTML = `
                    <div class="modal-content">
                        <button class="modal-close">✕</button>
                        <img class="modal-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="${name}">
                        <h3 class="modal-title">${name} (#${id})</h3>
                        <div class="modal-actions">
                            <button id="modal-ver-detalle" class="guardar">Ver detalle</button>
                            <button id="modal-capturar" class="guardar">Capturar</button>
                        </div>
                    </div>
                `;
                document.body.appendChild(modal);

                modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
                modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
            } else {
                modal.querySelector('.modal-img').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
                modal.querySelector('.modal-title').textContent = `${name} (#${id})`;
            }

            // acciones del modal
            const verBtn = document.getElementById('modal-ver-detalle');
            const capBtn = document.getElementById('modal-capturar');
            if (verBtn) verBtn.onclick = () => { if (typeof window.Detalle === 'function') window.Detalle(id); };
            if (capBtn) capBtn.onclick = () => {
                const lista = JSON.parse(localStorage.getItem('misNumeros')) || [];
                if (!lista.includes(id)) {
                    lista.push(id);
                    localStorage.setItem('misNumeros', JSON.stringify(lista));
                    if (typeof window.Capturados === 'function') window.Capturados();
                    // marcar badge
                    const it = document.querySelector(`#collage-wrap .collage-item[data-id='${id}']`);
                    if (it && !it.classList.contains('captured')) {
                        it.classList.add('captured');
                        const badge = document.createElement('span'); badge.className = 'captured-badge'; badge.textContent = '✔'; it.appendChild(badge);
                    }
                }
            };
            // mostrar modal
            modal.style.display = 'flex';
        }
}

window.Informativa = Informativa;