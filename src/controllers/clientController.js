const Client = require('../models/client');

class ClientController {
    getAllClients = (req, res)=>{
        Client.find({}, (error, data)=>{
            if(error){
                res.status(500).json({message: "Error al hacer la petición"})
            }else{
                res.status(200).json(data);
            }
        })
    }
    
    newClient = (req, res) => {
        let objClient = req.body;
        Client.create(objClient, (error) => {
            if (error) {
                res.status(500).json(error)
            } else {
                res.status(201).json({ info: "Cliente creado exitosamente" })
            }
        })
    }
    getClientById = (req, res) => {
        let id = req.params.id;
        Client.findById(id, (error, data) => {
            if (error) {
                res.status(500).json(error)
            } else {
                res.status(200).json(data)
            }
        })
    }

    editClient = (req, res) => {
        let objClient = req.body
        Client.updateOne({_id: objClient._id},{$set: req.body},(error, data) =>{
            if(error){
                res.status(500).json({message: error})
            }else{
                res.status(200).json(data)
            }
        })
        
    }
}
module.exports = ClientController;