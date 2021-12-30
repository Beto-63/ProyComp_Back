// Archivo de configuración para las variables de entorno (.env)

module.exports = {
    //SECRET_KEY: process.env.JWT_PRIVATE_KEY,
    DB: {
        server: process.env.SERVER_DB,
        user: process.env.USER_DB,
        pass: process.env.PASS_DB,
        database: process.env.DATABASE
    },
    RECOVERY_EMAIL: {
        host: 'smtp.gmail.com', // email host
        service: 'gmail', // email service
        port: '587', // email port
        user: 'testback202@gmail.com', // email id
        pass: 'ku2in1t9CrUFrusw5thI' // email password
    }
}