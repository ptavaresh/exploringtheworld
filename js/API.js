class API {
    async obtenerDatos() {
        //datos desde el api
        const datos = await fetch(`https://exploringtheworld.pythonanywhere.com/places/`);
        //const datos = await fetch(`http://127.0.0.1:8000/places/`);
        //retornar json
        const respuestaJSON = await datos.json();
        //retornar datos
        return {
            respuestaJSON
        }
    }
}
