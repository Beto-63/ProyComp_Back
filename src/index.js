//Configurar variables de entorno
require('dotenv').config();
//*************Las Claves del .env deben guardarse y poner en git ignore */
// Importar Dependencias
const express = require('express');
const morgan = require('morgan')
const cors = require('cors');
//Importar Modulos y Clases : Rutas y Clase de Conexion
const IndexRouter = require('./routers/indexRouter');
const UserRouter = require('./routers/userRouter');
const ConnDb = require('./database/ConnDb');
const User_requestRouter = require('./routers/user_requestRouter');


class Server {

    constructor() {
        this.objConn = new ConnDb();
        //Crear aplicación express
        this.app = express();
        this.#config();
    }

    #config() {
        //Indicar al servidor que procesará datos en formato JSON durante las peticiones http
        this.app.use(express.json());
        //Usar morgan en express para el monitoreo de las peticiones htttp
        this.app.use(morgan('tiny'));
        //Permitir conexiones de origen cruzado
        this.app.set('PORT', process.env.PORT || 3000);
        //------------Crear rutas----------
        let indexR = new IndexRouter();
        let userR = new UserRouter();
        let user_requestR = new User_requestRouter();
        //-----------Añadir ruta a express----------
        this.app.use(indexR.router);
        this.app.use(userR.router);
        this.app.use(user_requestR.router);
        //Poner a la escucha el servidor
        this.app.listen(this.app.get('PORT'), () => {
            console.log("Servidor corriendo por el puerto => ", this.app.get('PORT'))
        });
    }



}
new Server();