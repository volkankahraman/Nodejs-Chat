var express = require('express');
const PORT = process.env.PORT;

var Server = class Server{
    constructor(){
        this.app = express();
        this.app.use(express.static('public'));
    }

    Listen(){
        console.log("Sunucu "+ PORT +" portundan dinlenilmeye başlandı");
        return this.app.listen(PORT); 
    }
}

module.exports = Server;