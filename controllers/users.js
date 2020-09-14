'use strict;'

const userModel = require("../models/users")
const jwt = require('jsonwebtoken')
var ACCESS_TOKEN_SECRET='cd720ce3844bb9b8a628e8473c324fefa1f83567f30104cb511645df97d09eb79be8586b0a2ea9512a02ed04f886dde562b3ff8dcf2fc60e0610c9fe505f3dc0'

const signup = async(req, res, next) =>{
   try {
   	var email = (req.body.email).toLowerCase()
   	req.body.email = email;
    const newUser = await userModel.create(req.body)
    return res.status(200).json({Success:true, data:newUser});
  } catch (err) {
    console.log("err", err)
    return res.status(400).json({Success:false, message:"Error while registering"})  
  }
 
}

const updateUser = async(req, res, next)=>{
	try{
		var email = (req.body.email).toLowerCase()
		delete req.body.email;
		await userModel.find({email:email},req.body);
		return res.status(400).json({Success:true, message:"User successfully updated"}) 
	}catch(err){
		return res.status(400).json({Success:false, message:"Error while updating user"}) 
	}
}

const getUsersByEmail = async(req, res, next)=>{
	try{
		var email = (req.params.email).toLowerCase();
		const userDetails = await userModel.find({email:email});
		if(userDetails){
			return res.status(200).json({Success:true, data:userDetails}) 
		}else{
			return res.status(200).json({Success:true, message:"No Data Found!!"}) 
		}
	}catch(err){
		console.log("err", err)
		return res.status(400).json({Success:false, message:"Error while getting user"}) 
	}
}

const login = async(req, res, next) =>{
	const lowerEmail = (req.body.email).toLowerCase()
	const logged_user = await userModel.findOne({email:lowerEmail});
	if (logged_user == null) 
	  return res.json({Success:false, message:"Invalid email or password"})

	const passwordexists = await userModel.findOne({password:req.body.password})   
	  if(passwordexists==null) 
		 return res.json({Success:false, message:"Invalid email or password"})
		 
	  //Authorize user
	const user={email:req.body.email};
	const accessToken=jwt.sign(user, ACCESS_TOKEN_SECRET) 
	return res.json({Success:true, data:{access_token:accessToken, userDetails:logged_user}}) 
 
}

const getUsers = async (req, res)=>{
	const list = await userModel.find({});
	return res.status(200).json({Success:true, data:list});

}

const authenticateToken = (req, res, next) => {
	const token = req.headers['access-token']
	jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
	  console.log(err)
	  if (err) return res.send({Success:false, message:"unAuthorized User, please LoginIn"})
	  req.user = user
	  next()
	})
  }
module.exports = {
	signup, 
	login,
	authenticateToken,
	getUsers,
	updateUser,
	getUsersByEmail
}
