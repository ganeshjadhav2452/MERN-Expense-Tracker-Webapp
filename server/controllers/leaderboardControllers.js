const Expense = require('../models/expenseModel');
const User = require('../models/userModel');
const sequelize = require('sequelize');

module.exports = leaderboardControllers = {
    getLeaderboardData: async (req, res) => {
        let data = [];

        try {

            const leaderboardOfUsers = await User.find({})
            .select('id name total_cost') // Equivalent to "attributes" in sequelize
            .sort({ total_cost: -1 }) // Sort by "total_cost" in descending order
            .limit(5);

        

            res.status(200).json({ leaderboardOfUsers })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'sorry something went wrong' })
        }
    }
}