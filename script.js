
/**
 * En esta variable guardo el historial de búsquedas, que almacenaré luego en el localstorage
 */
let historialarray = []
/**
 * Puntero para controlar qué 100 pokemon muestro con el boton mostrar mas
 */
let puntero = 100;



/**
 * Esta funcion la creé para eliminar el historial.
 */
async function borrarListaHistorial(){
    if(!!document.getElementById("listahistorial") == true){
        let listah = document.getElementById("listahistorial")
        listah.remove();
    }
}


/**
 * Esta función es para eliminar la lista principal donde listo todo los pokemon
 */
async function borrarListaPrincipal(){
    if(!!document.getElementById("listaprincipal") == true ){
        let lista = document.getElementById("listaprincipal");
        lista.remove();
    }
}

/**
 * Incremento el puntero del botón mostrarMas, para ir sumando 100 cada vez que lo presiono
 * 
 */
let incrementaPuntero = () => {
    return puntero+=100;
}

/**
 * Cuando presiono el botón mostrar más se ejecuta esta función, que me muestra los siguientes 100 pokemon.
 */
async function mostrarMas(){
    eliminarBotonMostrar();
    const response =  await fetch('https://pokeapi.co/api/v2/pokemon/?limit=100&offset='+puntero)
    const json = await response.json();
    let idreal = puntero;


    puntero = incrementaPuntero();

    for(let i = 0; i< json.results.length; i++){
        const response = await fetch(json.results[i].url)
        const data = await response.json();

        let listote = document.createElement("li");
        listote.setAttribute("id", "lista");

        let lista = document.getElementById("listaprincipal");
        document.body.appendChild(lista);
        

        let div = document.createElement("div");
        div.setAttribute("id", "divlista")
        document.body.appendChild(div);


        let foto = document.createElement("img")   
        foto.setAttribute("src", data.sprites.other['official-artwork'].front_default)
        foto.setAttribute("width", "200px");
        foto.setAttribute("height", "200px");
        foto.setAttribute("id", "fotopokemon")
        div.appendChild(foto);

        let nombre = document.createElement("p");
        nombre.setAttribute("id", "nombrepokemon");
        nombre.innerHTML = data.name.toUpperCase();
        div.appendChild(nombre);

        let divtipos = document.createElement("div");
        divtipos.setAttribute("id", "divtipos");
        div.appendChild(divtipos);

        let linea = document.createElement("div");
        linea.setAttribute("id", "linea");
        div.appendChild(linea);

        let divid = document.createElement("div");
        divid.setAttribute("id", "divid");
        div.appendChild(divid);

        let id = document.createElement("div");
        id.setAttribute("id", "idpokemon");
        let idd = i+idreal+1;
        id.innerHTML = "N.º "+idd;
        divid.appendChild(id);


        for(let j = 0; j<data.types.length; j++){
            let tipo1 = saberTipo(data);
            let tipo = document.createElement("div");
            tipo.setAttribute("id", tipo1[j]);
            tipo.innerHTML = tipo1[j];
            divtipos.appendChild(tipo);

        }
        

        div.appendChild(divtipos)
        listote.appendChild(div);
        lista.appendChild(listote);

    
        if(i == json.results.length-1){

            let li = document.createElement("li");
            li.setAttribute("id", "listamostrar")
            let div = document.createElement("div");
            document.body.appendChild(div);

        
            let mostrarMas = document.createElement("input")
            mostrarMas.type = "submit";
            mostrarMas.id = "mostrarMas";
            mostrarMas.value = "Mostrar más";
            mostrarMas.setAttribute("onclick", "mostrarMas()")

            div.appendChild(mostrarMas)
            li.appendChild(div)
            document.getElementById('listaprincipal').appendChild(li)
        }


    }
}

/**
 * 
 * Añado al historial la búsqueda que se acaba de realizar
 */
async function anadirHistorial(placehold){
    if(placehold != ""){
        historialarray.push(placehold)
    }
}


/**
 * Cuando pulsamos el botón de buscar, ya sea con la tecla Enter o el clic del ratón, nos llevará a esta función donde
 * buscamos los pokemon que coincidan con la cadena de caracteres que hayas pasado
 */
async function buscarPokemon(){
    let placehold = document.getElementById("buscador").value;
    
    let contador = 0;
    await anadirHistorial(placehold);
    await borrarListaHistorial();
    await borrarListaPrincipal();

    let lista2 = document.createElement("ul")
    lista2.setAttribute("id", "listaprincipal")
    document.body.appendChild(lista2);

    if(placehold == ""){
        contador = 1;
        puntero = 100;
        await imprimirPokemon();
    }
    else{
        
        const response1 = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=10000&offset=0');
        const data1 = await response1.json();
        let totalpokemones = data1.count;
        for(let i = 0; i<totalpokemones; i++){
                
            if((data1.results[i].name.includes(placehold))){
                const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+data1.results[i].name)
                const data = await response.json();

                let celda = document.createElement("li");
                celda.setAttribute("id", "lista");

                
                let linea = document.createElement("div");
                linea.setAttribute("id", "linea");
                

                let div = document.createElement("div");
                document.body.appendChild(div);

                let foto = document.createElement("img")   
                foto.setAttribute("src", data.sprites.other['official-artwork'].front_default)
                foto.setAttribute("width", "200px");
                foto.setAttribute("height", "200px");
                div.appendChild(foto);

                let nombre = document.createElement("p");
                nombre.setAttribute("id", "nombrepokemon");
                nombre.innerHTML = data.name.toUpperCase();
                div.appendChild(nombre);

                let id = document.createElement("p");
                id.setAttribute("id", "idpokemon");
                let idd = i+1;
                id.innerHTML = "N.º "+idd;

                let divtipos = document.createElement("div");
                divtipos.setAttribute("id", "divtipos");
                div.appendChild(divtipos);


                for(let j = 0; j<data.types.length; j++){
                    let tipo1 = saberTipo(data);
                    let tipo = document.createElement("div");
                    tipo.setAttribute("id", tipo1[j]);
                    tipo.innerHTML = tipo1[j];
                    divtipos.appendChild(tipo);
        
                }

                

                celda.appendChild(div);
                celda.appendChild(linea);
                celda.appendChild(id)
                celda.appendChild(divtipos);
                lista2.appendChild(celda);
                
                contador = 1;
            }

        }
    }

    if(contador == 0){
        alert("No existe ese Pokémon")
    }

}

/**
 * Elimino el botón de mostrar más
 */
let eliminarBotonMostrar = () =>{
    let botonmostrar = document.getElementById("mostrarMas");
    
    botonmostrar.remove();
}

/**
 * Con esta función me creo y coloco toda la cabecera de la página (fotos, título...)
 */
let getTitulo = () => {    
    let cabecera = document.createElement("div");
    cabecera.setAttribute("id", "cabecera");
    document.body.appendChild(cabecera)

    let titulo = document.createElement("titulo")
    titulo.setAttribute("id", "titulo");
    titulo.innerHTML = "Pokédex";
    cabecera.appendChild(titulo);


    let masterball = document.createElement("img");
    masterball.setAttribute("src", "masterball.png");
    masterball.setAttribute("id", "masterball");
    cabecera.appendChild(masterball)

    let logo = document.createElement("img")
    logo.setAttribute("src", "logo.png");
    logo.setAttribute("id", "logo")
    cabecera.appendChild(logo);

    
}


/**
 * Cuando clicamos en el botón Historial, se ejecuta esta función, que nos quita la lista principal y nos muestra el historial, si es que han
 * habido búsquedas anteriormente.
 */
let getHistorial = () => {
    let borrar = document.getElementById("listaprincipal");
    borrar.remove();


    let listahistorial = document.createElement("ul")
    listahistorial.setAttribute("id", "listahistorial")
    document.body.appendChild(listahistorial)

    for(let i = 0; i < historialarray.length; i++){
        localStorage.setItem(i, historialarray[i])
        console.log(localStorage.getItem(i));
        let celda = document.createElement("li");
        let prueba = document.createElement("p");

        let historial = localStorage.getItem(i);

        prueba.innerHTML = historial;

        celda.appendChild(prueba);
        listahistorial.appendChild(celda);

    }

    eliminarBotonMostrar();


}

/**
 * Se ejecuta al pulsar el botón eliminar historial, y lo que hace es eliminar el historial que almacenamos en el localstorage
 */
function borrarHistorial(){
    borrarListaHistorial();
    let tamano = historialarray.length;


    for(let i = 0; i<=tamano; i++){
        
        localStorage.removeItem(i);
        historialarray.shift();
        
    }
}


/**
 * Con esta función conseguimos añadir el autocompletado a un buscador que creamos aqui tambien, junto con los demás botones de la parte superior
 */
function getBuscador(){
    let form = document.createElement("form");
    form.setAttribute("autocomplete", "off")
    form.setAttribute("action", "script.js")
    document.body.appendChild(form)

    let div = document.createElement("div")
    div.setAttribute("id", "autocomplete")
    form.appendChild(div);

    let div2 = document.createElement("div")
    div2.setAttribute("id", "divBotones")
    document.body.appendChild(div2)


    let buscador = document.createElement("input");
    buscador.type = "search";
    buscador.id = "buscador";
    buscador.placeholder = "Introduce el pokémon";
    document.body.appendChild(buscador);

    let boton = document.createElement("input");
    boton.type = "submit";
    boton.id = "boton";
    boton.value = "Buscar";
    boton.setAttribute("onclick", "buscarPokemon()");
    document.body.appendChild(boton);

    let botonHistorial = document.createElement("input");
    botonHistorial.type = "submit";
    botonHistorial.id = "botonHistorial";
    botonHistorial.value = "Historial";
    botonHistorial.setAttribute("onclick", "getHistorial()");
    document.body.appendChild(botonHistorial);

    let borrarHistorial = document.createElement("input");
    borrarHistorial.type = "submit";
    borrarHistorial.id = "borrarHistorial";
    borrarHistorial.value = "Borrar Historial";
    borrarHistorial.setAttribute("onclick", "borrarHistorial()")
    document.body.appendChild(borrarHistorial)

    

    div.appendChild(buscador);
    div2.appendChild(boton)
    div2.appendChild(botonHistorial)
    div2.appendChild(borrarHistorial)


}



/**
 * Con esta función conseguimos saber los tipos de los pokemon y los devolvemos.
 * 
 */
function saberTipo(data){
    let tipos = []
    for(let i = 0; i<data.types.length; i++){
        switch(data.types[i].type.name){
            case "grass":
               tipos.push("Planta");
               break;
            case "poison":
                tipos.push("Veneno")
                break;
            case "fire":
                tipos.push("Fuego");
                break;
            case "water":
                tipos.push("Agua");
                break;
            case "dark":
                tipos.push("Siniestro")
                break;
            case "bug":
                tipos.push("Bicho")
                break;
            case "psychic":
                tipos.push("Psiquico")
                break;
            case "dragon":
                tipos.push("Dragon")
                break;
            case "steel":
                tipos.push("Acero")
                break;
            case "ground":
                tipos.push("Tierra")
                break;
            case "fairy":
                tipos.push("Hada")
                break;
            case "normal":
                tipos.push("Normal")
                break;
            case "ghost":
                tipos.push("Fantasma")
                break;
            case "flying":
                tipos.push("Volador")
                break;
            case "electric":
                tipos.push("Electrico")
                break;
            case "fighting":
                tipos.push("Lucha")   
                break;
            case "ice":
                tipos.push("Hielo")
                break;
            case "rock":
                tipos.push("Roca")
                break;    

        }
    }

    return tipos;
}



/*
Esta función asíncrona nos sirve para mostrar todos los pokemon al principio, mediante dos promesas, una para conseguir el nombre de los pokemon y 
su correspondiente url donde aparece mas informacion
*/
async function imprimirPokemon(){
    await borrarListaPrincipal();
    const response =  await fetch('https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0')
    const json = await response.json();
    let lista = document.createElement("ul");
    lista.setAttribute("id", "listaprincipal")
    document.body.appendChild(lista); 

    for(let i = 0; i< json.results.length; i++){
        const response = await fetch(json.results[i].url)
        const data = await response.json();

        let listote = document.createElement("li");
        listote.setAttribute("id", "lista");


        let div = document.createElement("div");
        div.setAttribute("id", "divlista")
        document.body.appendChild(div);


        let foto = document.createElement("img")   
        foto.setAttribute("src", data.sprites.other['official-artwork'].front_default)
        foto.setAttribute("width", "200px");
        foto.setAttribute("height", "200px");
        foto.setAttribute("id", "fotopokemon")
        div.appendChild(foto);

        let nombre = document.createElement("p");
        nombre.setAttribute("id", "nombrepokemon");
        nombre.innerHTML = data.name.toUpperCase();
        div.appendChild(nombre);

        let divtipos = document.createElement("div");
        divtipos.setAttribute("id", "divtipos");
        div.appendChild(divtipos);

        let linea = document.createElement("div");
        linea.setAttribute("id", "linea");
        div.appendChild(linea);

        let divid = document.createElement("div");
        divid.setAttribute("id", "divid");
        div.appendChild(divid);

        let id = document.createElement("div");
        id.setAttribute("id", "idpokemon");
        let idd = i+1;
        id.innerHTML = "N.º "+idd;
        divid.appendChild(id);

        


        for(let j = 0; j<data.types.length; j++){
            let tipo1 = saberTipo(data);
            let tipo = document.createElement("div");
            tipo.setAttribute("id", tipo1[j]);
            tipo.innerHTML = tipo1[j];
            divtipos.appendChild(tipo);

        }
        

        div.appendChild(divtipos)
        listote.appendChild(div);
        
        lista.appendChild(listote);
    
        if(i == json.results.length-1){

            let li = document.createElement("li");
            li.setAttribute("id", "listamostrar")
            let div = document.createElement("div");
            document.body.appendChild(div);

        
            let mostrarMas = document.createElement("input")
            mostrarMas.type = "submit";
            mostrarMas.id = "mostrarMas";
            mostrarMas.value = "Mostrar más";
            mostrarMas.setAttribute("onclick", "mostrarMas()")

            div.appendChild(mostrarMas)
            li.appendChild(div)
            document.getElementById('listaprincipal').appendChild(li)
        }



    }


}


/*
Función para cambiar el estilo del color de letra al CSS
*/
function cambiarColorTitulo(){
    let titulo = document.getElementById("titulo");
    titulo.style.color = "rgb(109, 0, 0)";

}

imprimirPokemon();
getTitulo();
getBuscador();
cambiarColorTitulo();





/*
Esto nos sirve para que el buscador se pulse cuando pulsamos la tecla Enter del teclado
*/
document.getElementById("buscador")
    .addEventListener("keyup", function(e) {
        if (e.code === 'Enter') {
            document.getElementById("boton").click();
        }
    });
 
document.getElementById("boton").onclick = function() {
    buscarPokemon();
}