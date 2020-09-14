'use strict;'
const razorpay = require('../keys/razorpay');
const request = require('request');

const Razorpay = require('Razorpay')
const  instance = new Razorpay({
   key_id: razorpay.key_id,
   key_secret: razorpay.key_secret,
 });

console.log("razorpay", razorpay.key_secret, razorpay.key_secret)
const order = async(req, res, next) =>{

    try {
        const options = {
          amount: (req.body.amount),
          currency: "INR",
          receipt: "receipt#1",
          payment_capture: 0
        };
      instance.orders.create(options, async function (err, order) {
        if (err) {
            console.log("error", err)
          return res.status(500).json({
            message: "Something Went Wrong",
          });
        }
      return res.status(200).json({Success:true, data:order});
     });
    } catch (err) {
        console.log("api error", err)
      return res.status(500).json({
        message: "Something Went Wrong",
      });
     }
 
}

const payementDetails = async (req, res, next) => {
  console.log("key_secret", razorpay.key_id)
  try {
    return request(
     {
     method: "POST",
     url: `https://${razorpay.key_id}:${razorpay.key_secret}@api.razorpay.com/v1/payments/${req.body.paymentId}/capture`,
     form: {
        amount: (req.body.amount) , // amount == Rs 10 // Same As Order amount
        currency: "INR",
      },
    },
   async function (err, response, body) {
     if (err) {
       console.log("err", err)
      return res.status(500).json({
         message: "Something Went Wrong",
       }); 
     }
      console.log("Status:", response.statusCode);
      console.log("Headers:", JSON.stringify(response.headers));
      console.log("Response:", body);
      return res.status(200).json({Success:true, message:"Transaction successfully completed"});
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong",
   });
  }
}

module.exports ={
    order,
    payementDetails
}