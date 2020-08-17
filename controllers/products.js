'use strict;'

const product = require("../models/products.js")

const getProduct = async(req, res, next) =>{
	try{
		const list = await product.find({});
		return res.status(200).json({Success:true, data:list})
	}catch(err){
    return res.status(400).json({Success:false, message:"Error while getting details of Product"})
	}
 
}

const createProduct = async (req, res, next) => {
  try {
    const productObj= await product.create(req.body)
    return res.status(200).json({Success:true, data:productObj})
  } catch (err) {
    return res.status(400).json({Success:false, message:"Error while adding Product"})  
  }
}
  

const updateProduct = async (req, res, next) => {
  try {
    if(Object.keys(req.body).length == 1 && req.body.status){
      await product.findOneAndUpdate({_id:req.params.id},{$set:{status:req.body.status}})
      return res.status(200).json({Success:true, message:"Product is successfully completed"})
    }else{
        const updatedData = await product.findOneAndUpdate({_id:req.params.id}, req.body, {
          new: true,
        })
        return res.status(200).json({Success:true, data:updatedData})
    }
  } catch (err) {
    return res.status(400).json({status:"Failure", message:"Error while updating Product"});
  }
}


const deleteProduct = async(req, res, next)=>{
  try{
    await product.findByIdAndRemove({_id:req.params.id})
    return res.status(200).json({Success:true, message:"Product is Successfully Deleted"})
  }catch(err){
    return res.status(400).json({Success:false, message:"Error while deleting Product"});
  }
}

module.exports = {
	getProduct, 
	createProduct,
  updateProduct,
  deleteProduct
}