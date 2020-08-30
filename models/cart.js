
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
	userId: {type: String, required: true},
	prdct:[
		{
		prdctId:{type: String, required: true},
		quantity:{type:Number, required:true}
	
	}],
	totalAmount:{type:Number, required:true},
	discountedAmount:{type:Number, required:true}
})

const cartModel = mongoose.model("carts", cartSchema) // creating the model from the schema

module.exports = cartModel // exporting the model