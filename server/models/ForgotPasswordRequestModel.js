
const mongoose = require('mongoose')


const ForgotPasswordRequestSchema = new mongoose.Schema({
    
    uuid:{
        type:String,
        require:true
    },
    isActive:{
        type:Boolean,
        
    },

})



module.exports = mongoose.model('ForgotPasswordRequest', ForgotPasswordRequestSchema)