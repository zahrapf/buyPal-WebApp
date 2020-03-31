const express = require("express");
const router = express.Router();

const promotionModel = require("../models/promotion");
const bsProductModel = require("../models/bsProduct");
const categoryModel = require("../models/category");

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

