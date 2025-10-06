
// crear una funcion con el nombre  del archivo 
function favoritos (){
     let favoritosList = JSON.parse(localStorage.getItem("favoritos")) || [];
    if(favoritosList.length == 0){
        document.getElementById("root").innerHTML = "no hay favoritos"
    }else{
        document.getElementById("root").innerHTML = generarLista(favoritosList)
    }
}
