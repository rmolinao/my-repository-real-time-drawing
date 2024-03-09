module.exports = (io) => {
    let data = [];
    //escucha cuando un usuario se conecta a la pagina
    io.on('connection', (socket) => {
        // trasmite el evento de dibujo guardados a usuarios nuevos
        data.forEach( fact => {
            io.emit('show_drawing', fact);
        });
        // trasmites el evento a los  usuarios nuevos ya conectados
        socket.on('drawing', (drawing) => {
            data.push(drawing);
            io.emit('show_drawing', drawing);
        });
    });
}