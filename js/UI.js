class UI {
    constructor() {

         
         //instananciar API
         this.api = new API();
         //crar los markrs con layer group
         this.markers = new L.LayerGroup();
         // Iniciar el mapa
         this.mapa = this.inicializarMapa();

    }

    inicializarMapa() {
         // Inicializar y obtener la propiedad del mapa
         const map = L.map('mapa').setView([19.390519, -99.3739778], 16);

         //centra el mapa en tu zona actual
         map.locate({setView: true, maxZoom: 10});

         const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
         L.tileLayer(
             'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
             attribution: '&copy; ' + enlaceMapa + ' Contributors',
             maxZoom: 18,
             }).addTo(map);

             //obtener lat y long al clickear el mapa
             map.on('click', 
             function(e){
                 var coord = e.latlng.toString().split(',');
                 var lat = coord[0].split('(');
                 var lng = coord[1].split(')');
                 console.log("You clicked the map at latitude: " + lat[1] + " and longitude:" + lng[0]);
             });
             
         return map;

    }

    mostrarEstablecimientos() {
        this.api.obtenerDatos()
            .then(datos => {
                const resultado = datos.respuestaJSON;
                console.log(datos.respuestaJSON)
                //ejecutar funcion para mostrar los pines
                this.mostrarPines(resultado);
            })
    }

    mostrarPines(datos) {
        //limpia los markers al iniciar la app
        this.markers.clearLayers();
        //recorrer los establecimeintos
        datos.forEach(dato => {
            //hacemos destructuring al objeto dato 
            const {latitude, longitude, description, city, country, estimated_date} = dato;
            console.log(dato)
            //crear pop up
            const opcionesPopUp = L.popup()
                .setContent(`<p>País: ${country}</>
                             <p><b>Ciudad: </b> $ ${city}</p>
                             <p><b>Descripcion: </b> $ ${description}</p>
                             <p><b>Fecha estimada: </b> $ ${estimated_date}</p>
                `);

            //agregar el PIN
            const marker = new L.marker([
                parseFloat(latitude),
                parseFloat(longitude)
                //adjuntar el popUp al marker
            ]).bindPopup(opcionesPopUp);

            this.markers.addLayer(marker);
        });
        //crear icono de posicion actual
        var greenIcon = L.icon({
            iconUrl: 'img/leaf-green.png',
            shadowUrl: 'img/leaf-shadow.png',
        
            iconSize:     [38, 95], // size of the icon
            shadowSize:   [50, 64], // size of the shadow
            iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });
        var {lat, lng} = this.mapa._lastCenter
        const whereiam = new L.marker([
            parseFloat(lat),
            parseFloat(lng)],
            {icon: greenIcon}
            ).bindPopup("Estas por aqui...").openPopup();
        this.markers.addLayer(whereiam);

        this.markers.addTo(this.mapa)
    }

    //buscador
    obtenerSugerencias(busqueda) {
        this.api.obtenerDatos()
            .then(datos => {
                //obtener los datos
                const resultados = datos.respuestaJSON;

                //enviar el json y la busqueda para el filtrado
                this.filtrarSugerencias(resultados, busqueda);
            })
    }
    //filtra las sgerencias
    filtrarSugerencias(resultado, busqueda) {
        //filtrar con .filter
        //TODO need to use lowercase and uppercase
        const filtro = resultado.filter(filtro => filtro.city.indexOf(busqueda) !== -1);
        console.log(filtro)
        //mostrar pines
        this.mostrarPines(filtro)
    }
}
