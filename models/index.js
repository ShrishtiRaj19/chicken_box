const mongoose = require("mongoose");
const db_url = process.env.MONGODB_URL || 'mongodb://localhost/chickenBox';
console
mongoose.connect(db_url, {
	keepAlive: true,
  	useNewUrlParser: true,
  	useUnifiedTopology: true
})

mongoose.set("debug", true) 
mongoose.Promise = Promise;

module.exports.products = require("./products")
module.exports.categories = require("./categories")
module.exports.cart = require("./cart");
module.exports.banners = require("./banner")
