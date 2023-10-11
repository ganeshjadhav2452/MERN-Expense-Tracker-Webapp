const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/orderModel");
const User = require('../models/userModel')

require('dotenv').config()


const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRETE,
});

module.exports = paymentController = {
  createOrder: async (req, res) => {
   
    try {
      await instance.orders.create(
        { amount: 50000, currency: "INR" },
        async (err, order) => {
          if (err) {
            throw new Error(err);
          }
        
          try {
            await Order.create({
              orderId: order.id,
              status: "PENDING",
            });

           
          } catch (error) {
           
            console.log(error);
            res.status(500).send("sorry payment request failed");
          }
          res.status(200).json({ data: { ...order, key_id: instance.key_id } });
        }
        );
      } catch (error) {
     console.log(error)
      res.status(403).json({ message: "something went wrong", error: error });
    }
  },

  verifyPayment: async (req, res) => {
  
    
    const body =
      req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", instance.key_secret)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === req.body.razorpay_signature) {
      try {
        await Order.updateOne(
          { orderId: req.body.razorpay_order_id },
          {status: 'SUCCESS'}
        )

        await User.updateOne(
          {_id:req.userId},
          {isPremiumUser:true}
          )

      
      } catch (error) {
     
        console.log(error)
      }
      res.status(200).json({ message: "payment sucessfull" });

    } else {
      res.status(500).json({ message: "payment failed" });
    }
  },
};
