'use strict;'

const cart = require("../models/cart.js");
const product = require("../models/products.js")
const bodyparser = require('body-parser');
const _ = require("underscore")

const getCart = async(req, res, next) =>{
	try{
		cart.findOne({userId:req.params.userId}).then((cartDetail)=>{
			console.log("cartdetails", cartDetail)
			var prductIds = _.pluck(cartDetail.prdct, 'prdctId');
			if(prductIds.length){
				product.find({_id:{$in:prductIds}}).then((data)=>{
					_.each(cartDetail.prdct, (newPrdct)=>{
						if(newPrdct.prdctId == data._id){
							data["quantity"] = newPrdct.quantity;
						}
					})
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
	var newprdct = [];
	var updateCartObj;
  try {
  	const availablePrdt = await cart.findOne({userId:req.body.userId});
  	if(availablePrdt){
  		for(let data of availablePrdt.prdct){
  			for(let newData of req.body.prdct){
  				if(newData.prdctId != data.prdctId){
  					newprdct.push(newData);
  				}else{
  					newData.quantity += data.quantity;
  					await cart.updateOne({"prdct.prdctId":newData.prdctId},{$set:{'prdct.$[prdct].quantity': newData.quantity}}, {"arrayFilters":[{"prdct.prdctId":newData.prdctId}]})
  					var productObj = await product.findOne({_id:newData.prdctId})
  					if(productObj.quantity> newData.quantity){
	  					var a= -(newData.quantity)
	  					await product.findOneAndUpdate({_id:newData.prdctId},{$inc:{quantity:a}})
  					}else{
  						if(productObj.quantity == 0){
  							await product.findOneAndUpdate({_id:newData.prdctId},{$inc:{outOfStock:true}});
  						}
  					}
  					return res.status(200).json({Success:true, message:"product updated to cart successfully"})
  				}
  			}
  		}
  		if(newprdct && newprdct.length){
  			updateCartObj = await cart.update({userId:req.body.userId},{$push:{prdct:req.body.prdct}})
    		return res.status(200).json({Success:true, message:"product updated to cart successfully"})
  		}
  	}else{
    	const cartObj= await cart.create(req.body)
    	return res.status(200).json({Success:true, data:cartObj})
  	}

  } catch (err) {console.log("errr", err)
    return res.status(400).json({Success:false, message:"Error while adding cart"})  
  }
}

const deleteCart = async(req, res, next)=>{
  try{
  	if(req.query.deleteType === "all"){
    	await cart.find({userId:req.query.userId}).remove();
    	return res.status(200).json({Success:true, msg:"Cart is Successfully Deleted"})
  	}else{
  		await cart.updated({'prdct.prdctId':req.query.productId}, {$pull:{'prdct.prdctId':req.query.productId}});
  		return res.status(200).json({Success:true, msg:"Product is Successfully Deleted from Cart"})
  	}
  }catch(err){
  	console.log("error", err)
    return res.status(400).json({Success:false, msg:"Error while deleting cart"});
  }
}

module.exports = {
	getCart, 
	createCart,
  	deleteCart
}