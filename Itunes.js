//Para crear nuestro propio element usamos la herencia y 
//creamos un clase que Hereda de HTMLElement
export class BuscaCancionesItunes extends HTMLElement {
    
    //creamos los nodos hijos, que colgarán del elemento raíz personalizado
    constructor() {
        super();
        //esto se denonina DOM sombra. y es un pequeño árbol independiente
        let shadow = this.attachShadow({ mode: 'open' }); //con esta opción permitimos que el JS externo manipule este subarbol
        let plantilla = BuscaCancionesItunes.template;//la plantilla. El HTML puro y duro. Ver el método get template
        let clone = document.importNode(plantilla.content, true);//conectamos el nuevo trozo html con el documento original
        shadow.appendChild(clone);//añadimos el contenido

    }


    //Detalle importante ver cómo programamos el callback con el host
    static get template() {
        let template = document.createElement('template');
        template.innerHTML = `
        <input type="search" placeholder="Introduzca tema o artista a buscar"></input>
        <button onclick="this.getRootNode().host.buscar()">BUSCAR</button>`;
        return template;
    }

    connectedCallback() {
        console.log("redenrizando");
    }

    mostrarCancion (cancion)
    {
        console.log (cancion.artistName);
        let artista = document.createElement ("h3");
        artista.innerHTML = cancion.artistName;
        document.querySelector('lista-canciones-itunes').shadowRoot.appendChild(artista);

    }
   
    mostrarResultados (resultados)
    {
        let cancion = null;

        for (cancion of resultados)
        {
            this.mostrarCancion (cancion);
        }
    }

    buscar ()
    {
        console.log("buscaar");
        
        this.busqueda = this.shadowRoot.children[0].value;
        console.log ("A buscar " +  this.shadowRoot.children[0].value);

        fetch('https://itunes.apple.com/search/?media=music&term='+this.busqueda)
                .then(function(response) {
                return response.json();})
                .then( (json_busqueda)  => {
                console.log(json_busqueda);
                this.mostrarResultados (json_busqueda.results);
                });
        
    }

}