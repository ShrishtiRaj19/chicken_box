
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String, required: true
  },
  email:{type:String, required:true, unique:true},
  phone:{type:Number, required:true},
  password:{type:String, required:false},
  address:{
    house_no:{type:String, required:true},
    block_no:{type:String, required:true},
    building_nm:{type:String, required:true},
    street:{type:String, required:true},
    landmark:{type:String, required:true},
    pincode:{type:Number, required:true},
    locality:{type:String, required:true},
    city:{type:String, required:true}
  }
  
})

const userModel = mongoose.model("users", userSchema) // creating the model from the schema

module.exports = userModel // exporting the model