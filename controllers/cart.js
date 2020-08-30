'use strict;'

const cart = require("../models/cart.js");
const product = require("../models/products.js")
const bodyparser = require('body-parser');
const _ = require("underscore")

const getCart = async(req, res, next) =>{
	try{
		cart.findOne({userId:req.params.userId}).then((cartDetail)=>{
			var prductIds = _.pick(cartDetail, 'prdct');
			console.log("prductIds", prductIds)
			if(Object.keys(prductIds).length && prductIds.prdct .length){
				product.find({_id:{$in:prductIds.prdct}}).then((data)=>{
					console.log("data?????????", cartDetail)
					var obj = {}
					obj["prdtDetails"] = data;
					obj["_id"] = cartDetail._id;
					obj["userId"] = cartDetail.userId;
					obj["totalAmount"] = cartDetail.totalAmount;
					obj["discountedAmount"] = cartDetail.discountedAmount
					return res.status(200).json({Success:true, data:obj})
				});
			}else{
				return res.status(200).json({Success:true, message:"No data Found!!"})
			}

		});
	}catch(err){
    return res.status(400).json({status:"Failure", msg:"Error while getting details of cart"})
	}
 
}


const createCart = async (req, res, next) => {
  try {
  	const availablePrdt = await cart.findOne({$or:{userId:req.body.userId}});
  	console.log("availablePrdt", availablePrdt)
  	var ids = _.pluck(availablePrdt.prdct, 'prdctId')
  	if(availablePrdt){
  		const updateCartObj = await cart.update({userId:req.body.userId},{$push:{prdct:req.body.prdct}})
    	return res.status(200).json({Success:true, message:"product added to cart successfully"})
  	}else{
    	const cartObj= await cart.create(req.body)
    	return res.status(200).json({Success:true, data:cartObj})
  	}

  } catch (err) {
    return res.status(400).json({Success:false, message:"Error while adding cart"})  
  }
}
  

const deleteCart = async(req, res, next)=>{
  try{
    await cart.findByIdAndRemove({_id:req.params.cartId})
    return res.status(200).json({status:"Success", msg:"cart is Successfully Deleted"})
  }catch(err){
    return res.status(400).json({status:"Failure", msg:"Error while deleting cart"});
  }
}

module.exports = {
	getCart, 
	createCart,
  	deleteCart
}