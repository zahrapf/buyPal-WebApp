const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const session = require('express-session');
const fileUpload = require('express-fileupload');


//load controllers
const generalController = require("./controllers/general");
const productController = require("./controllers/product");
const userController = require("./controllers/user");

require("dotenv").config({path:"./config/keys.env"});

const app = express();

app.engine("handlebars", exphbs(
    {
        helpers:{
            ifEquals: function(arg1, arg2, options) {
                return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
            }
        }

    }
));
app.set("view engine", "handlebars");

app.use(express.static("public"));

//Parse application
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req,res,next)=>{

    if(req.query.method=="PUT")
    {
        req.method="PUT"
    }

    else if(req.query.method=="DELETE")
    {
        req.method="DELETE"
    }

    next();
})

app.use(session({
    secret: `${process.env.SECRET_KEY}`,
    resave: false,
    saveUninitialized: true
}));

app.use((req,res,next) => {
    res.locals.user = req.session.userInfo

    next();
});


app.use(fileUpload());


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