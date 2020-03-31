const express = require("express");
const router = express.Router();

const promotionModel = require("../model/promotion");
const bsProductModel = require("../model/bsProduct");
const categoryModel = require("../model/category");

router.get("/", (req,res)=>{
    res.render("general/index", {
        title: "Home: buyPal.ca",
        headingInfo: "buyPal",
        promotion: promotionModel.getAllpromotion(),
        category: categoryModel.getAllCategory(),
        bsProduct: bsProductModel.getAllbsProduct()
    });
});

module.exports=router;

