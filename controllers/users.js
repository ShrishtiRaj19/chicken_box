'use strict;'

const userModel = require("../models/users")
const jwt = require('jsonwebtoken')
var ACCESS_TOKEN_SECRET='cd720ce3844bb9b8a628e8473c324fefa1f83567f30104cb511645df97d09eb79be8586b0a2ea9512a02ed04f886dde562b3ff8dcf2fc60e0610c9fe505f3dc0'

const signup = async(req, res, next) =>{
   try {
    const newUser = await userModel.create(req.body)
    return res.status(200).json(newUser)
  } catch (err) {
    console.log("err", err)
    return res.status(400).json({status:"Failure", msg:"Error while registering"})  
  }
 
}

const login = async(req, res, next) =>{
	const logged_user = await userModel.findOne({email:req.body.email});
	if (logged_user == null) 
	  return res.json({status:"Failure", message:"Invalid email or password"})

	const passwordexists = await userModel.findOne({password:req.body.password})   
	  if(passwordexists==null) 
		 return res.json({status:"Failure", message:"Invalid email or password"})
		 
	  //Authorize user
	const user={email:req.body.email};
	const accessToken=jwt.sign(user, ACCESS_TOKEN_SECRET) 
	return res.json({status:"success", data:{access_token:accessToken}}) 
 
}

const authenticateToken = (req, res, next) => {
	const token = req.headers['access-token']
	jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
	  console.log(err)
	  if (err) return res.send({success:"Failure", message:"unAuthorized User, please LoginIn"})
	  req.user = user
	  next()
	})
  }
module.exports = {
	signup, 
	login,
	authenticateToken
}
