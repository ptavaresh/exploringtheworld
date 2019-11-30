class API {
    async obtenerDatos() {
        //datos desde el api
        const datos = await fetch(`https://exploringtheworld.pythonanywhere.com/places/`);
        //retornar json
        const respuestaJSON = await datos.json();
        //retornar datos
        return {
            respuestaJSON
        }
    }
}
