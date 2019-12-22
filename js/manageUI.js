class manageUI {
    constructor() {


        //instananciar API
        this.api = new API();
        this.listado = document.getElementById('resultado-lugares');
        this.lugaresForm = document.getElementById('lugaresForm');
    }


    mostrarListaLugares() {
        this.api.obtenerDatos()
            .then(datos => {
                const resultado = datos.respuestaJSON;
                //ejecutar funcion para mostrar los pines
                console.log(resultado)
                this.mostrarLugares(resultado);
            })
    }
    //mostrar lugares
    mostrarLugares(resultado) {
        //recorrer los eventos
        resultado.forEach(lugar => {
            this.listado.innerHTML += `
            <tr id="${lugar.url}">
            <th scope="row"><a href="">${lugar.city}</a></th>
            <td>${lugar.country}</td>
            <td>${lugar.description}</td>
            <td>${lugar.estimated_date}</td>
        </tr>
    `;
        });
        this.lugares = document.querySelectorAll('#resultado-lugares tr');
        this.mostrarForm(resultado)
    }


    mostrarForm(resultado) {
        const regex = /\d+/;
        //console.log(this.lugares)
        this.lugares.forEach(lugar => {
            
            lugar.addEventListener('click', (e) => {
                e.preventDefault();
                //onsole.log(lugar)
                //obtener el id dentro del campo url
                let url = lugar.id
                console.log(url)
                //aplicar regex para obtener el valor numerico del id
                url = regex.exec(String(url))
                console.log(url)
                let dato = resultado[url-1]
                console.log(dato)
                this.lugaresForm.innerHTML = ''
                this.lugaresForm.innerHTML += `
                <form>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="">Ciudad</label>
                        <input type="text" class="form-control" id="city" value="${dato.city}">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="">Pais</label>
                        <input type="text" class="form-control" id="country" value="${dato.country}">
                    </div>
                </div>
                <div class="form-group">
                    <label for="">Descripcion</label>
                    <input type="text" class="form-control" id="description" value="${dato.description}">
                </div>
                <div class="form-group">
                    <label for="">Fecha estimada</label>
                    <input type="date" class="form-control" value="${dato.estimated_date}">
                </div>
                <button type="submit" class="btn btn-primary">Actualizar</button>
            </form>
                    `
            })
        })
    }

}