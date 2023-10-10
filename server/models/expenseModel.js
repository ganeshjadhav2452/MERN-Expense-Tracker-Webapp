const SequelizePackage = require('sequelize')

const mongoose = require('mongoose')


const ExpenseSchema = new mongoose.Schema({
  
    title:{
        type:String,
        require:true,
    },
    amount:{
        type:Number,
        require:true,
    },
    date:{
        require:true,
        type:Date,
    },
    category:{
        require:true,
        type:String,
    },
    debitOrCredit:{
        allowNull:false,
        type:String,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

module.exports = mongoose.model('Expense',ExpenseSchema);