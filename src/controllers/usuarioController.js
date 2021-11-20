const Usuario = require('../models/usuarios');
const jwt = require('jsonwebtoken');

class UsuarioController{

    obtenerTodoLosUsuarios(req, res){        
        Usuario.find((error, data)=>{
            if(error){
                res.status(500).send();
            }else{
                res.status(200).json(data);
            }
        });
        
    }

    obtenerUsuario(req, res){
        let id = req.params.id;
        Usuario.findById(id, (error, data)=>{
            if(error){
                res.status(500).send();
            }else{
                res.status(200).json(data);
            }
        })
    }

    crearUsuario(req, res){
        let objUsuario = req.body;     
        if(objUsuario.nombre && objUsuario.apellido){
            Usuario.create(objUsuario, (error, data)=>{
                if(error){
                    res.status(500).send();                
                }else{
                    res.status(201).json(data);
                }
            });
        }else{
            res.status(400).send();
        } 
        
    }

    actualizarUsuario(req, res){
        //let {id, nombre, apellido} = req.body;
        let id = req.params.id;
        Usuario.findByIdAndUpdate(id, req.body, (error, data)=>{
            if(error){
                res.status(500).send();
            }else{
                res.status(200).json(data);
            }
        });
    }

    eliminarUsuario(req, res){
        let {id} = req.body;
        if(id != null && id != undefined && id != ""){
            Usuario.findByIdAndRemove(id, (error, data)=>{
                if(error){
                    res.status(500).send();
                }else{
                    res.status(200).json(data);
                }
            });
        }else{
            res.status(400).send();
        }        
    }

    buscarPorApellido(req, res){
        let apellido = req.params.apellido;
        Usuario.find({apellido}, (error, data)=>{
            if(error){
                res.status(500).send();
            }else{
                res.status(200).json(data);
            }
        });
    }

    generarToken(req, res){
        let token = jwt.sign({nombre: "andres"}, "misionticUPBColombia");
        res.status(200).json({token});
    }
}

module.exports = UsuarioController;