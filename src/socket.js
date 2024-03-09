module.exports = (io) => {
    let data = [];
    let users = 0;
    //escucha cuando un usuario se conecta a la pagina
    io.on('connection', (socket) => {

        users += 1;
        io.emit('users', users);
        console.log(users);

        // trasmite el evento de dibujo guardados a usuarios nuevos
        data.forEach( fact => {
            io.emit('show_drawing', fact);
        });
        socket.on('delete', () => {

            data = [];
            io.emit('show_drawing', null);
        });
        // trasmites el evento a los  usuarios nuevos ya conectados
        socket.on('drawing', (drawing) => {
            data.push(drawing);
            io.emit('show_drawing', drawing);
        });

        socket.on('disconnect', () => {
            users -= 1;
            io.emit('users', users);
        });


    });
}