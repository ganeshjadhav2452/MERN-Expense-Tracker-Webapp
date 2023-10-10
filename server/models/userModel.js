
const mongoose = require('mongoose');
const { INTEGER } = require('sequelize');


const UserSchema = new mongoose.Schema({
  
    name:{
        type:String,
        require:false
    },
    email:{
        type:String,
        require:false
    },
    password:{
        type:String,
        require:false
    },
    isPremiumUser:{
        type:Boolean
    },
    total_cost:{
        type:Number
    }

})

module.exports =  mongoose.model('User',UserSchema );





