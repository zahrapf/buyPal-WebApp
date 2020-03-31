const express = require('express');
const router = express.Router();
const registerModel = require("../model/userRegistration");

router.get("/registration", (req,res)=>{
    res.render("user/register", {
        title: "Register: buyPal.ca",
        headingInfo: "buyPal"
    });
});
router.get("/dashboard", (req,res)=>{
    res.render("user/dashboard", {
        title: "Register: buyPal.ca",
        headingInfo: "buyPal",
    });
});
router.post("/registration", (req,res)=>{
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
       
        res.render("user/register", {
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

        const newUser = 
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }

        const user = new registerModel(newUser);

        user.save()
        .then(()=> {
            
            const {firstName, email} = req.body;
            const sgMail = require('@sendgrid/mail');
            sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
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
                res.redirect("/user/dashboard"); 
            })
            .catch(err =>{
                console.log(err);
            })    
        })
        .catch(err=>console.log(`${err} occured while adding data to database!`));
    
    }
});

router.get("/login", (req,res)=>{
    res.render("user/login", {
        title: "login: buyPal.ca",
        headingInfo: "buyPal"
    });
});

router.post("/login", (req,res)=>{
    const emailError = [];
    const passwordError = [];

    if(req.body.email === "" || req.body.email === null || req.body.email.length === 0){
        emailError.push("Enter your Email");
    }

    if(req.body.password === "" || req.body.password === null || req.body.password.length === 0){
        passwordError.push("Enter your password");
    }

    if(emailError.length > 0 || passwordError.length > 0){
       
        res.render("user/login", {
            title: "Login: buyPal.ca",
            headingInfo: "buyPal",
            emailErrorMsg: emailError,
            passwordErrorMsg: passwordError,
            user_email: req.body.email,
            user_password: req.body.password
        });
        
    }else{
        res.redirect("/user/dashboard"); 
    }
});


module.exports=router;