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
app.get("/dashboard", (req,res)=>{
    res.render("dashboard", {
        title: "Register: buyPal.ca",
        headingInfo: "buyPal",
    });
});
app.post("/registration", (req,res)=>{
    const firstnameError = [];
    const lastnameError = [];
    const emailError = [];
    const passwordError = [];
    const passwordAgainError = [];

    if(req.body.firstName==="" || req.body.firstName=== null || req.body.firstName.length===0){
        firstnameError.push("Enter your first name");
    }

    if(req.body.lastName==="" || req.body.lastName=== null || req.body.lastName.length===0){
        lastnameError.push("Enter your last name");
    }

    if(req.body.email==="" || req.body.email===null || req.body.email.length===0){
        emailError.push("Enter your Email");
    }else if(!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(req.body.email))){
        emailError.push("Enter a valid Email address")
    }

    if(req.body.password=="" || req.body.password== null || req.body.password.length===0){
        passwordError.push("You must enter your password");
    }else if(req.body.password.length < 6 || req.body.password.length > 12){
        passwordError.push("You must enter a password between 6 to 12 characters");
    }else if(!(/^(?=.*\d)(?=.*[a-zA-Z]).{6,12}$/.test(req.body.password))){
        passwordError.push("Your password must be alphanumeric one");
    }

    if(req.body.password !== req.body.passwordAgain){
        passwordAgainError.push("Your password does not match")
    }

    if(firstnameError.length > 0 || lastnameError.length > 0 || emailError.length > 0 || passwordError.length > 0 || passwordAgainError.length > 0){
       
        res.render("register", {
            title: "Register: buyPal.ca",
            headingInfo: "buyPal",
            firstnameErrorMsg: firstnameError,
            lastnameErrorMsg: lastnameError,
            emailErrorMsg: emailError,
            passwordErrorMsg: passwordError,
            passwordAgainErrorMsg: passwordAgainError,
            user_firstName: req.body.firstName,
            user_lastName: req.body.lastName,
            user_email: req.body.email,
            user_password: req.body.password
        });
        
        

    }else{

        const {firstName, email} = req.body;
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey("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");
        const msg = {
        to: `${email}`,
        from: 'zp.fakhar9675@gmail.com',
        subject: 'Confirmation Email for your buyPal account',
        html: `Hi ${firstName}, <br><br>
            You successfully registered in buyPal Website. 
            You can change your settings at any time.
            Check out your email for new promotions. <br> <br>
            Thank you!<br><br>
            Regards,<br><br>
            buyPal Team
            `,
        };
        sgMail.send(msg)
        .then(()=>{
            res.redirect("/dashboard"); 
        })
        .catch(err =>{
            console.log(err);
        })    
    }
});

app.get("/login", (req,res)=>{
    res.render("login", {
        title: "login: buyPal.ca",
        headingInfo: "buyPal"
    });
});

app.post("/login", (req,res)=>{
    const emailError = [];
    const passwordError = [];

    if(req.body.email === "" || req.body.email === null || req.body.email.length === 0){
        emailError.push("Enter your Email");
    }

    if(req.body.password === "" || req.body.password === null || req.body.password.length === 0){
        passwordError.push("Enter your password");
    }

    if(emailError.length > 0 || passwordError.length > 0){
       
        res.render("login", {
            title: "Login: buyPal.ca",
            headingInfo: "buyPal",
            emailErrorMsg: emailError,
            passwordErrorMsg: passwordError,
            user_email: req.body.email,
            user_password: req.body.password
        });
        
    }else{
        res.redirect("/");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server Started!`); 
});