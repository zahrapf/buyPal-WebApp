const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

const app = express();


const promotionModel = require("./model/promotion");
const bsProductModel = require("./model/bsProduct");
const categoryModel = require("./model/category");
const productModel = require("./model/product");

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req,res)=>{
    res.render("index", {
        title: "Home: buyPal.ca",
        headingInfo: "buyPal",
        promotion: promotionModel.getAllpromotion(),
        category: categoryModel.getAllCategory(),
        bsProduct: bsProductModel.getAllbsProduct()
    });
});

app.get("/products", (req,res)=>{
    res.render("products", {
        title: "Products: buyPal.ca",
        headingInfo: "buyPal",
        product: productModel.getAllProduct()
    });
});

app.get("/registration", (req,res)=>{
    res.render("register", {
        title: "Register: buyPal.ca",
        headingInfo: "buyPal"
    });
});
app.post("/registration", (req,res)=>{
    const errors = [];

    if(req.body.userName==""){
        errors.push("You must enter your user name");
    }

    let userEmail = req.body.email.toString();
    if(req.body.email==""){
        errors.push("You must enter your Email");
    }else if(!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail))){
        errors.push("Please enter a valid Email address")
    }

    let userPassword = req.body.password.toString();
    if(req.body.password=="" || req.body.userName == null){
        errors.push("You must enter your password");
    }else if(userPassword.length < 6 || userPassword.length > 12){
        errors.push("You must enter a password more than 6 and less than 12 characters");
    }else if(!(/^(?=.*\d)(?=.*[a-zA-Z]).{6,12}$/.test(userPassword))){
        errors.push("Your password must be alphanumeric one");
    }

    if(errors.length > 0){
       
        res.render("register", {
            title: "Register: buyPal.ca",
            errorMsg: errors,
            user_userName: req.body.userName,
            user_email: req.body.email,
            user_password: req.body.password
        });
        

    }else{
        
        const {userName} =req.body;
            res.render("register",{
                title: "Register: buyPal.ca",
                headingInfo: "buyPal",
                successMessage :`Thank you ${userName} 
                    for joining buyPal`
            }); 
    }

});

app.get("/login", (req,res)=>{
    res.render("login", {
        title: "login: buyPal.ca",
        headingInfo: "buyPal"
    });
});

app.post("/login", (req,res)=>{
    const errors = [];

    if(req.body.email === "" || req.body.email === null){
        errors.push("You must enter your Email");
    }

    if(req.body.password === "" || req.body.userName === null){
        errors.push("You must enter your password");
    }

    if(errors.length > 0){
       
        res.render("login", {
            title: "Login: buyPal.ca",
            errorMsg: errors,
            user_email: req.body.email,
            user_password: req.body.password
        });
        
    }else{
        res.render("index", {
            title: "Home: buyPal.ca",
            headingInfo: "buyPal",
            promotion: promotionModel.getAllpromotion(),
            category: categoryModel.getAllCategory(),
            bsProduct: bsProductModel.getAllbsProduct()
        });
    }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server Started!`); 
});