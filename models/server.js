const express = require('express');
const cors = require('cors');
const { socketsController } = require('../sockets/controller')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.path = {
            example: '/example'
        };

        //middlewares
        this.middlewares();
        //routes
        this.routes();
        //sockets
        this.sockets();
    }
    middlewares() {
        //*CORS
        this.app.use(cors());
        //*Public carpet
        this.app.use(express.static('public'));

    }
    routes() {
        this.app.use(this.path.example, require('../routes/example.routes'));
    }
    sockets() {
        this.io.on('connection', socketsController);
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log('Server listening on port ' + this.port);
        })
    }
}
module.exports = Server;