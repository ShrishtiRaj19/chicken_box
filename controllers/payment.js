'use strict;'
const {instance} = require('../keys/razorpay')

const order = async(req, res, next) =>{
    try {
        const options = {
          amount: 10 * 100, // amount == Rs 10
          currency: "INR",
          receipt: "receipt#1",
          payment_capture: 0,
     // 1 for automatic capture // 0 for manual capture
        };
      instance.orders.create(options, async function (err, order) {
        if (err) {
            console.log("error", err)
          return res.status(500).json({
            message: "Something Went Wrong",
          });
        }
      return res.status(200).json(order);
     });
    } catch (err) {
        console.log("api error", err)
      return res.status(500).json({
        message: "Something Went Wrong",
      });
     }
 
}

module.exports ={
    order
}