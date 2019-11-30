class API {
    async obtenerDatos() {
        //datos desde el api
        const datos = await fetch(`http://exploringtheworld.pythonanywhere.com/places/`);
        //retornar json
        const respuestaJSON = await datos.json();
        //retornar datos
        return {
            respuestaJSON
        }
    }
}