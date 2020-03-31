const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

//load controllers
const generalController = require("./controllers/general");
const productController = require("./controllers/product");
const userController = require("./controllers/user");

require("dotenv").config({path:"./config/keys.env"});

const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.static("public"));
//Parse application
app.use(bodyParser.urlencoded({ extended: false }));



app.use("/", generalController);
app.use("/user", userController);
app.use("/products", productController);


mongoose.connect(process.env.MONGO_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log(`MongoDB Database has been connected!`)
})
.catch(err => console.log(`Cannot connect to Database, ${err} occured!`));


const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server Started!`); 
});