function Home (parametro){
    for(var i = 0; i< 10; i++){
        id=[i+1];
       nombre = pokemones[i].name
       document.getElementById("root").innerHTML+=`
       <div class="un-pokemon" onclick="Detalle(${id})">
                <p>${id} ${nombre}</p>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" width="auto" height="60" loading="lazy" alt="${nombre}">
            </div>
            `
    }
    
}
