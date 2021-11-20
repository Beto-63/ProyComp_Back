const express = require('express');
const mongoose = require('mongoose');
//Importar las rutas
const IndexRouter = require('./routers/indexRouter');
const UsuarioRouter = require('./routers/usuarioRouter');
const {db} = require('./database/db');


class Server{

    constructor(){
        this.connDb();
        //Crear aplicación express
        this.app = express();
        this.config();
    }

    config(){
        this.app.use(express.json());
        this.app.set('PORT', process.env.PORT || 3000);
        //------------Crear rutas----------
        let indexR = new IndexRouter();
        let usuarioR = new UsuarioRouter();
        //-----------Añadir ruta a express----------
        this.app.use(indexR.router);
        this.app.use(usuarioR.router);
        //Poner a la escucha el servidor
        this.app.listen(this.app.get('PORT'), ()=>{
            console.log("Servidor corriendo por el puerto => ", this.app.get('PORT'))
        } );
    }

    connDb(){
        mongoose.connect(db).then(()=>{
            console.log("Conexión exitosa a la BD");
        }).catch(error=>{
            console.log("Error al conectar a la BD");
            console.error(error);
        });
    }

}
new Server();