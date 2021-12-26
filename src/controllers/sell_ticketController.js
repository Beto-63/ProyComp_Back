const Sell_ticket = require('../models/sell_ticket')

class Sell_ticketController{
    getAllTickets = (req, res)=>{
        Sell_ticket.find({}, (error, data)=>{
            if(error){
                res.status(500).json({info: error});
            }else{
                res.status(200).json(data);
            }
        });
}

}
module.exports = Sell_ticketController;