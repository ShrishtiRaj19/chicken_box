
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String, required: true,
  },
  catId: {
    type: String, required: true,
  },
  price: {
    type: String, required: true,
  },
  quantity: {
    type: String, required: true,
  },
  discount: {
    type: String, required: true,
  },
  image:{type:String, required:true},
  disc: { //description about product
    type: String, required: true,
  },
  status:{type:Number, required:false}
  
})

const productModel = mongoose.model("products", productSchema) // creating the model from the schema

module.exports = productModel // exporting the model