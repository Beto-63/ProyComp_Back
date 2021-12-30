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

// Libs
const { createRoles } = require('./libs/initialSetup');
createRoles();

//Importar Modulos y Clases : Rutas y Clase de Conexion
const AuthRouter = require('./routers/auth.Routes');
const IndexRouter = require('./routers/indexRouter');
const UserRouter = require('./routers/userRouter');
const StockRouter = require('./routers/stockRoutes');
const ProductRouter = require('./routers/productRoutes');
const CashRouter = require('./routers/cashRoutes');
const Sell_ticketRouter = require('./routers/sell_ticket.Routes');

const TestRouter = require('./routers/test.Routes');
const ClientRouter = require('./routers/client.Routes');


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
        this.app.use(express.urlencoded({ extended: false }));

        //Indicar al servidor que procesará datos en formato JSON durante las peticiones http
        this.app.use(express.json());

        //Usar morgan en express para el monitoreo de las peticiones htttp
        this.app.use(morgan('dev'));


        //TODO - Settings

        //Permitir conexiones de origen cruzado
        this.app.set('PORT', process.env.PORT || 3000);

        //------------Crear rutas----------
        let authR = new AuthRouter();
        let indexR = new IndexRouter();
        let userR = new UserRouter();
        let stockR = new StockRouter();
        let productR = new ProductRouter();
        let cashR = new CashRouter();
        let sell_ticketR = new Sell_ticketRouter();
        let clientR = new ClientRouter();
        
        let testR = new TestRouter();

        //-----------Añadir ruta a express----------
        this.app.use(authR.router);
        this.app.use(indexR.router);
        this.app.use(userR.router);
        this.app.use(stockR.router);
        this.app.use(productR.router);
        this.app.use(cashR.router);
        this.app.use(sell_ticketR.router);
        this.app.use(clientR.router);

        this.app.use(testR.router);

        //Poner a la escucha el servidor
        this.app.listen(this.app.get('PORT'), () => {
            console.log("Servidor corriendo por el puerto => ", this.app.get('PORT'))
        });
    }



}
new Server();