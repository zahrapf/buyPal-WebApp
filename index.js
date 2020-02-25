const express = require("express");

const app = express();

const exphbs = require("express-handlebars");

const promotionModel = require("./model/promotion");
const bsProductModel = require("./model/bsProduct");
const categoryModel = require("./model/category");
const productModel = require("./model/product");

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");


app.use(express.static("public"));

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
    res.render("register", {
        title: "Register: buyPal.ca",
        headingInfo: "buyPal"
    });
});

app.get("/login", (req,res)=>{
    res.render("login", {
        title: "login: buyPal.ca",
        headingInfo: "buyPal"
    });
});

app.post("/login", (req,res)=>{
    res.render("login", {
        title: "login: buyPal.ca",
        headingInfo: "buyPal"
    });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server Started!`); 
});