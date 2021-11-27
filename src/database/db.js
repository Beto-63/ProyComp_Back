
// Datos de conexion a la base de datos, para produccion van en .env usando  dotenv
const user = process.env.USER_DB;;
const pass = process.env.PASS_DB;
const database = process.env.DATA_BASE;

module.exports = {
    db: `mongodb+srv://${user}:${pass}@cluster0.t3ey5.mongodb.net/${database}?retryWrites=true&w=majority`

}