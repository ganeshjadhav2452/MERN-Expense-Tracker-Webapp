

const mongoose = require('mongoose');



const OrderSchema = new mongoose.Schema({

   
    orderId:String,
    status:String,
})

module.exports = mongoose.model('Order',OrderSchema);

