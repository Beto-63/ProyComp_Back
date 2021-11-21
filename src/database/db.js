
// Datos de conexion a la base de datos, para produccion van en .env usando  dotenv
const user = "ProyComp";
const pass = "ProyComp";
const database = "ElDoko";

module.exports = {
    db: `mongodb+srv://${user}:${pass}@cluster0.t3ey5.mongodb.net/${database}?retryWrites=true&w=majority`

}