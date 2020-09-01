
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String, required: true,
  },
  catId: {
    type: String, required: true,
  },
  price: {
    type: Number, required: true,
  },
  quantity: {
    type: Number, required: true,
  },
  discount: {
    type: Number, required: true,
  },
  image:{type:String, required:true},
  disc: { //description about product
    type: String, required: true,
  },
  status:{type:Number, required:false},
  outOfStock:{type:Boolean, required:false, default:false}
  
})

const productModel = mongoose.model("products", productSchema) // creating the model from the schema

module.exports = productModel // exporting the model