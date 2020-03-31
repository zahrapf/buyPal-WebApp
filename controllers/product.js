const express = require("express");
const router = express.Router();

const productModel = require("../models/product");

router.get("/list", (req,res)=>{
    res.render("product/products", {
        title: "Products: buyPal.ca",
        headingInfo: "buyPal",
        product: productModel.getAllProduct()
    });
});

module.exports=router;