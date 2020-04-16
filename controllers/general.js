const express = require("express");
const router = express.Router();

const promotionModel = require("../models/promotion");
const categoryModel = require("../models/category");

const productModel = require("../models/product");

router.get("/", (req,res)=>{

    productModel.find({bestSeller:"Best Seller"})
    .then((products)=>{
  
        const filteredProduct = products.map(product=>{

            return {

                id: product._id,
                productPhoto : product.productPhoto
            }
        });


        res.render("general/index", {
            title: "Home: buyPal.ca",
            headingInfo: "buyPal",
            promotion: promotionModel.getAllpromotion(),
            category: categoryModel.getAllCategory(),
            bestSellerProduct: filteredProduct
        });
    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));  
});

module.exports=router;

