export const socketController = (socket) => {
    //Con este bloque probamos a cargar la url en un navegador: http://localhost:9090/
    console.log("Cliente conectado: ", socket.id); //Estos 'id' son muy volátiles y no es muy correcto usarlos para nada especial. Luego se asociarán los clientes a salas y eso es lo más correcto, gestionarlo en las salas.

    socket.on('disconnect', () => {
        console.log("Cliente desconectado", socket.id);
    });
   
    socket.on('enviar-mensaje', (newTarea,callback) => {
           
            callback({msg: "Mensaje recibido", tarea:newTarea});
            //callback({msg: "Mensaje recibido", payload: payload});
            //Con lo siguiente, el servidor envía el mensaje a los clientes.
            socket.broadcast.emit('recibir-mensaje', newTarea);
    });
    
  

}