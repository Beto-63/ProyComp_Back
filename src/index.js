//Configurar variables de entorno
require('dotenv').config();
//*************Las Claves del .env deben guardarse y poner en git ignore */
// Importar Dependencias
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

//Importar la conexión de la DB
const ConnDb = require('./database/ConnDb');

//Importar Modulos y Clases : Rutas y Clase de Conexion
const IndexRouter = require('./routers/indexRouter');
const UserRouter = require('./routers/userRouter');


class Server {

    constructor() {
        this.objConn = new ConnDb();
        //Crear aplicación express
        this.app = express();
        this.#config();
    }

    #config() {

        //TODO - Middlewares

        // Para ocultar información sensible del servidor
        this.app.use(helmet());

        // Permitir conexiones desde otros origenes remotos
        this.app.use(cors());

        // Para cuando me envien una petición POST desde un formulario, 
        // pueda entender los campos que vienen desde allí
        this.app.use(express.urlencoded({extended: false})); 

        //Indicar al servidor que procesará datos en formato JSON durante las peticiones http
        this.app.use(express.json());

        //Usar morgan en express para el monitoreo de las peticiones htttp
        this.app.use(morgan('dev'));


        //TODO - Settings

        //Permitir conexiones de origen cruzado
        this.app.set('PORT', process.env.PORT || 3000);

        //------------Crear rutas----------
        let indexR = new IndexRouter();
        let userR = new UserRouter();
        
        //-----------Añadir ruta a express----------
        this.app.use(indexR.router);
        this.app.use(userR.router);

        //Poner a la escucha el servidor
        this.app.listen(this.app.get('PORT'), () => {
            console.log("Servidor corriendo por el puerto => ", this.app.get('PORT'))
        });
    }



}
new Server();