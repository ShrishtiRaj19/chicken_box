// 'use strict;'

// const cart = require("../models/cart.js")

// const getCart = async(req, res, next) =>{
// 	try{
// 		const list = await cart.find({});
// 		return res.status(200).json(list)
// 	}catch(err){
//     return res.status(400).json({status:"Failure", msg:"Error while getting details of cart"})
// 	}
 
// }

// const createCart = async (req, res, next) => {
//   try {
//     const cartObj= await cart.create(req.body)
//     return res.status(200).json(cartObj)
//   } catch (err) {
//     return res.status(400).json({status:"Failure", msg:"Error while adding cart"})  
//   }
// }
  

// const updateCart = async (req, res, next) => {
//   try {
//     if(Object.keys(req.body).length == 1 && req.body.status){
//       await cart.findOneAndUpdate({_id:req.params.id},{$set:{status:req.body.status}})
//       return res.status(200).json({status:"Success", msg:"cart is successfully completed"})
//     }else{
//         const updatedData = await cart.findOneAndUpdate({_id:req.params.id}, req.body, {
//           new: true,
//         })
//         return res.status(200).json(updatedData)
//     }
//   } catch (err) {
//     return res.status(400).json({status:"Failure", msg:"Error while updating cart"});
//   }
// }


// const deleteCart = async(req, res, next)=>{
//   try{
//     await cart.findByIdAndRemove({_id:req.params.id})
//     return res.status(200).json({status:"Success", msg:"cart is Successfully Deleted"})
//   }catch(err){
//     return res.status(400).json({status:"Failure", msg:"Error while deleting cart"});
//   }
// }

// module.exports = {
// 	getCart, 
// 	createCart,
//   updateCart,
//   deleteCart
// }