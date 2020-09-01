'use strict;'

const bannerModel = require("../models/banner.js")

const getBannerList = async(req, res, next) =>{
	try{
		const list = await bannerModel.find({});
		return res.status(200).json({Success:true, data:list})
	}catch(err){
    return res.status(400).json({Success:"Failure", message:"Error while getting detail of Banner"})
	}
 
}

const searchBanner = async(req, res, next)=>{
  try{
    let cond = {};
    if(req.body.searchText){
      cond = {name:{$regex:req.body.searchText, $options:"i"}}
    }
    const list = await bannerModel.find(cond);
    if(list && list.length){
      return res.status(200).json({Success:true, data:list})
    }else{
      return res.status(200).json({Success:"Success", message:"No record found!"})
    }

  }catch(err){
    console.log("err", err)
    return res.status(400).json({Success:"Failure", message:"Error while getting list of Banner"})
  }
}

const createBanner = async (req, res, next) => {
  console.log("in cretaeCtaegory function")
  try {
    const newBanner = await bannerModel.create(req.body);
    return res.status(200).json({Success:true, data:newBanner})
  } catch (err) {
    return res.status(400).json({Success:false, message:"Error while adding Banner"})  
  }
}

const getBannerById = async (req, res, next) => {
  try {
    const Banner = await bannerModel.findOne({_id:req.params.id})
    return res.status(200).json({Success:true, data:Banner})
  } catch (err) {
    console.log("err", err)
    return res.status(400).json({Success:false, message:"Error while getting Banner details"})  
  }
}
  

const updateBanner = async (req, res, next) => {
  try {
    if(Object.keys(req.body).length ==1  && req.body.status){
  	  await bannerModel.findOneAndUpdate({_id:req.params.id},{$set:{status:req.body.status}})
   	  return res.status(200).json({Success:true, message:"Status is successfully updated"})

    }else{
      const updatedData = await bannerModel.findOneAndUpdate({_id:req.params.id}, req.body, {
        new: true,
      })
      return res.status(200).json({Success:true, data:updatedData})
    }
  } catch (err) {
    return res.status(400).json({Success:false, message:"Error while updating Banner"});
  }
}


const deleteBanner = async(req, res, next)=>{
  try{
   await bannerModel.findByIdAndRemove({_id:req.params.id})
    return res.status(200).json({Success:true, message:"Banner is Successfully Deleted"})
  }catch(err){
    return res.status(400).json({Success:false, message:"Error while deleting Banner"});
  }
}

module.exports = {
	getBannerList, 
	createBanner,
  	updateBanner,
  	searchBanner,
  	getBannerById,
 	deleteBanner

}