'use strict;'

const categoriesModel = require("../models/categories.js")

const getCategory = async(req, res, next) =>{
	try{
		const list = await categoriesModel.find({});
		return res.status(200).json(list)
	}catch(err){
    return res.status(400).json({status:"Failure", msg:"Error while getting detail of Category"})
	}
 
}

const searchCategory = async(req, res, next)=>{
  try{
    let cond = {};
    if(req.body.searchText){
      cond = {name:{$regex:req.body.searchText, $options:"i"}}
    }
    const list = await categoriesModel.find(cond);
    if(list && list.length){
      return res.status(200).json(list)
    }else{
      return res.status(200).json({status:"Success", msg:"No record found!"})
    }

  }catch(err){
    console.log("err", err)
    return res.status(400).json({status:"Failure", msg:"Error while getting list of Category"})
  }
}

const createCategory = async (req, res, next) => {
  console.log("in cretaeCtaegory function")
  try {
    const newCategory = await categoriesModel.create(req.body);
    return res.status(200).json(newCategory)
  } catch (err) {
    return res.status(400).json({status:"Failure", msg:"Error while adding Category"})  
  }
}

const getCategoryById = async (req, res, next) => {
  try {
    const Category = await categoriesModel.findOne({_id:req.params.id})
    return res.status(200).json(Category)
  } catch (err) {
    console.log("err", err)
    return res.status(400).json({status:"Failure", msg:"Error while getting Category details"})  
  }
}
  

const updateCategory = async (req, res, next) => {
  try {
    if(Object.keys(req.body).length ==1  && req.body.status){
  	  await categoriesModel.findOneAndUpdate({_id:req.params.id},{$set:{status:req.body.status}})
   	  return res.status(200).json({status:"Success", msg:"Status is successfully updated"})

    }else{
      const updatedData = await categoriesModel.findOneAndUpdate({_id:req.params.id}, req.body, {
        new: true,
      })
      return res.status(200).json(updatedData)
    }
  } catch (err) {
    return res.status(400).json({status:"Failure", msg:"Error while updating Category"});
  }
}


const deleteCategory = async(req, res, next)=>{
  try{
   await categoriesModel.findByIdAndRemove({_id:req.params.id})
    return res.status(200).json({status:"Success", msg:"Category is Successfully Deleted"})
  }catch(err){
    return res.status(400).json({status:"Failure", msg:"Error while deleting Category"});
  }
}

module.exports = {
	getCategory, 
	createCategory,
  updateCategory,
  searchCategory,
  getCategoryById,
  deleteCategory

}