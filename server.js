'use strict;'
const express = require("express");
const app =  express();
const bodyparser = require('body-parser');
const db = require("./models/index.js")
var productRoutes = require('./routes/products');
var categoryRoutes = require('./routes/categories');
// var cartRoutes = require('./routes/cart');
var usersRoutes = require('./routes/users')
const router = express.Router();
var cors = require("cors")

app.use(bodyparser.json())
app.use('/api',router);
productRoutes(router);
categoryRoutes(router);
// cartRoutes(router);
usersRoutes(router);
app.use(cors({origin: '*'}))

const appPort = process.env.PORT ? process.env.PORT :4000 
app.listen(appPort, ()=>{
	console.log("listening to port", appPort, " !!");
})

