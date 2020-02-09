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
        title: "Home: ZARA.ca",
        headingInfo: "Amazon",
        promotion: promotionModel.getAllpromotion(),
        category: categoryModel.getAllCategory(),
        bsProduct: bsProductModel.getAllbsProduct()
    });
});

app.get("/products", (req,res)=>{
    res.render("products", {
        title: "Products: ZARA.ca",
        headingInfo: "Amazon",
        product: productModel.getAllProduct()
    });
});

app.get("/registration", (req,res)=>{
    res.render("register", {
        title: "Register: ZARA.ca",
        headingInfo: "Amazon"
    });
});

app.get("/login", (req,res)=>{
    res.render("login", {
        title: "login: ZARA.ca",
        headingInfo: "Amazon"
    });
});



const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server Started!`); 
});