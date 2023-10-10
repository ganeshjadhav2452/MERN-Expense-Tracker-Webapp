const Expense = require('../models/expenseModel');
const User = require('../models/userModel');
const sequelize = require('sequelize');

module.exports = leaderboardControllers = {
    getLeaderboardData: async (req, res) => {
        let data = [];

        try {

            const leaderboardofusers = await User.findAll({
                attributes: ['id', 'name', 'total_cost'],

                group: ['user.id'],
                order: [['total_cost', 'DESC']],
              
                limit: 5
            })

            // const expenseData = await Expense.findAll({
            //     attributes: [
            //         'userId',
            //         [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount']
            //     ],
            //     group: ['userId']
            // });
            // console.log(expenseData)

            // for(let i = 0; i<expenseData.length; i++){
            //     let userObj = {};
            //     let isPresent = false

            //     for(let j = 0; j<data.length; j++){
            //         if(data[j].id === expenseData[i].userId){
            //             isPresent = true
            //         }

            //         if(isPresent){
            //             data[j].amount += expenseData[i].amount;
            //             break;
            //         }
            //     }

            //     if(!isPresent){
            //         let user = await User.findAll({where:{id:expenseData[i].userId}})
            //     userObj.name = user[0].name;
            //     userObj.id = user[0].id;
            //     userObj.amount = expenseData[i].amount

            //     data.push(userObj)
            //     }

            // }

            res.status(200).json({ leaderboardofusers })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'sorry something went wrong' })
        }
    }
}