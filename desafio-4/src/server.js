import http from 'http';
import app from './app.js';
import { Server } from 'socket.io';

const serverHttp = http.createServer(app);
const serverSocket = new Server(serverHttp);

const PORT = 8080;

serverHttp.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}/`);
});

serverSocket.on('connection', (socketClient) => {
    console.log(`Se ha conectado el cliente con el id ${socketClient.id}`);

    socketClient.on('new-message', (message) => {
        console.log(`El cliente con el id ${socketClient.id} envió el mensaje: ${message}`);
    });

    socketClient.on('disconnect', () => {
        console.log(`Se ha desconectado el cliente con el id ${socketClient.id}`);
    });

    socketClient.emit('mensaje_directo', 'Este es un mensaje directo al cliente actual.');

    socketClient.broadcast.emit('mensaje_a_todos_los_clientes', 'Este es un mensaje directo a todos los clientes menos al actual.');

    serverSocket.emit('mensaje_a_todos', 'Este es un mensaje directo a todos los clientes sin excepcion.');
})