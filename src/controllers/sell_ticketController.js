const Sell_ticket = require('../models/sell_ticket')

class Sell_ticketController {
    getAllTickets = (req, res) => {
        Sell_ticket.find({}, (error, data) => {
            if (error) {
                res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
            } else {
                res.status(200).json(data);
            }
        });
    }
    getTicketByDate = (req, res) => {
        let fechaInicial = req.body.fechaInicial;
        let fechaFinal = req.body.fechaFinal;
        Sell_ticket.find({
            "$and": [{
                "createdAt": {
                    "$gte": fechaInicial,
                    "$lte": fechaFinal
                }
            }]
        }, (error, data) => {
            if (error) {
                res.status(500).json({ messaje: error })
            } else {
                res.status(200).json(data);
            }
        })

    }

    getTicketById = (req, res) => {
        const id = req.params.id;
        Sell_ticket.findById(id, (error, data) => {
            if (error) {
                res.status(500).json({ "Error Type": error.name, "Detalle": error.message })
            } else {
                res.status(200).json(data)
            }
        })
    }
    newTicket = (req, res) => {
        let objSellTicket = req.body;
        Sell_ticket.create(objSellTicket, (error, data) => {
            if (error) {
                res.status(500).json({ "Error Type": error.name, "Detalle": error.message });
            } else {
                res.status(201).json({ message: 'Ticket Creado' })
            }
        })
    }
}
module.exports = Sell_ticketController;