const express = require("express");
const router = express.Router();
const productModel = require("../models/product");
const userShopsModel = require("../models/userCart");
const path = require("path");
const isAuthenticated = require("../middleware/authentication");
const isAdministrator = require("../middleware/clerkAutherization");

router.get("/list", (req,res)=>{

    productModel.find()
    .then((products)=>{
  
        const filteredProduct = products.map(product=>{

            return {

                id: product._id,
                productName: product.productName,
                productPrice: product.productPrice,
                productCategory :product.productCategory,
                bestSeller: product.bestSeller ,
                productPhoto : product.productPhoto
            }
        });

        res.render("product/products", {
            title: "Products: buyPal.ca",
            headingInfo: "buyPal",
            product: filteredProduct
            
        });
    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));    
});
router.post("/list", (req,res)=> {

    productModel.find({productCategory:req.body.productCategory})
    .then((products)=>{
  
        const AllProduct = products.map(product=>{

            return {

                id: product._id,
                productName: product.productName,
                productPrice: product.productPrice,
                productCategory :product.productCategory,
                productQuantity :product.productQuantity,
                bestSeller: product.bestSeller ,
                productPhoto : product.productPhoto,
                productDescription : product.productDescription
            }
        });

        res.render("product/products", {
            title: "registerDashboard: buyPal.ca",
            headingInfo: "buyPal",
            product: AllProduct
        });
    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));  
});
router.get("/list/:id",(req,res)=>{

    productModel.findById(req.params.id)
    .then((product)=>{

        const {_id,
                productName,
                productPrice,
                productDescription,
                productQuantity,
                productPhoto} = product;
        res.render("product/oneProduct",{
            title: "Product detail: buyPal.ca",
            headingInfo: "buyPal",
            _id,
            productName,
            productPrice,
            productDescription,
            productQuantity,
            productPhoto
        });

    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));


});
router.get("/add_product",isAuthenticated, isAdministrator, (req,res)=>{
    res.render("product/addProducts", {
        title: "registerDashboard: buyPal.ca",
        headingInfo: "buyPal",
    });
});
router.post("/add_product", isAuthenticated, isAdministrator, (req,res) =>{

    const productnameError = [];
    const productPriceError = [];
    const productCatError = [];
    const productQuantityError = [];
    const productImgError = [];
    

    if(req.body.productName==="" || req.body.productName.length===0){
        productnameError.push("Enter the product name");
    }

    if(req.body.productPrice===""){
        productPriceError.push("Enter the product price");
    }

    if(req.body.productCategory==="" ){
        productCatError.push("Enter the product category");
    }

    if(req.body.productQuantity==""){
        productQuantityError.push("You must enter product quantity");
    }

   //Check whether the file is image or not
    const re = /(\.JPG|\.JPEG|\.BMP|\.GIF|\.PNG|\.jpg|\.jpeg|\.bmp|\.gif|\.png)$/i;
    if(req.files == null){
        productImgError.push("You need to upload an image");
    }
    else if(!re.exec(req.files.productPhoto.name))
    {
        productImgError.push("You need to upload an image");
    }
    
    if(productImgError.length > 0 || productnameError.length > 0 || productPriceError.length > 0 || productCatError.length > 0 || productQuantityError.length > 0){
       
        res.render("product/addProducts", {
            title: "Register: buyPal.ca",
            headingInfo: "buyPal",
            productnameErrorMsg: productnameError,
            productPriceErrorMsg: productPriceError,
            productCategoryErrorMsg: productCatError,
            productQuantityErrorMsg: productQuantityError,
            productImgError: productImgError,
            product_name: req.body.productName,
            product_price: req.body.productPrice,
            product_category: req.body.productCategory,
            product_quantity: req.body.productQuantity
        });
        
    }else{

        const newProduct = 
        {
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            productDescription: req.body.productDescription,
            productCategory: req.body.productCategory,
            productQuantity: req.body.productQuantity,
            bestSeller: req.body.bestSeller,
            productPhoto: req.body.productPhoto
        }

        const product = new productModel(newProduct);

        product.save()
        .then((product) => {
           
            req.files.productPhoto.name = `productImg_${product._id}${path.parse(req.files.productPhoto.name).ext}`;
            
            req.files.productPhoto.mv(`public/img/${req.files.productPhoto.name}`)
            .then(()=>{


                productModel.updateOne({_id:product._id},{
                    productPhoto: req.files.productPhoto.name
                })
                .then(()=>{
                    res.redirect("/products/edit_product");
                })
    
            })
        })    
        .catch(err=>console.log(`${err} occured while adding product to database!`));
    
    }
    
});
router.get("/edit_product", isAuthenticated, isAdministrator, (req,res)=>{

    productModel.find()
    .then((products)=>{
  
        const AllProduct = products.map(product=>{

            return {

                id: product._id,
                productName: product.productName,
                productPrice: product.productPrice,
                productCategory :product.productCategory,
                productQuantity :product.productQuantity,
                bestSeller: product.bestSeller ,
                productPhoto : product.productPhoto,
                productDescription : product.productDescription
            }
        });

        res.render("product/editProducts", {
            title: "registerDashboard: buyPal.ca",
            headingInfo: "buyPal",
            product: AllProduct
        });
    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));  

});
router.get("/edit/:id", isAuthenticated, isAdministrator,(req,res)=>{

    productModel.findById(req.params.id)
    .then((product)=>{

        const {_id,productName,
            productPrice,
            productDescription,
            productCategory,
            productQuantity,
            bestSeller,
            productPhoto} = product;
        res.render("product/editProductForm",{
            _id,
            productName,
            productPrice,
            productDescription,
            productCategory,
            productQuantity,
            bestSeller,
            productPhoto
        });

    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));


});
router.put("/update/:id", isAuthenticated, isAdministrator, (req,res)=>{
    

    const product =
    {
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        productDescription: req.body.productDescription,
        productCategory: req.body.productCategory,
        productQuantity: req.body.productQuantity,
        bestSeller: req.body.bestSeller
    }
    
    productModel.updateOne({_id:req.params.id},product)
    .then(()=>{
        
        res.redirect("/products/list");
    })
    .catch(err=>console.log(`Error happened when updating data from the database :${err}`));

});
router.delete("/delete/:id", isAuthenticated, isAdministrator, (req,res)=>{
    
    productModel.deleteOne({_id:req.params.id})
    .then(()=>{
        res.redirect("/products/edit_product");
    })
    .catch(err=>console.log(`Error happened when deleting data from the database :${err}`));

});
router.get("/list/userShoppingCart/:id", isAuthenticated, (req,res) => {
    productModel.findById(req.params.id)
    .then((product)=>{

        const userShop = 
        {
            userId: req.session.userInfo._id,
            productId: req.params.id,
            productName: product.productName,
            productPhoto: product.productPhoto,
            productPrice: product.productPrice,
            quantityOrderd: req.body.quantityOrderd
        }

        const userShoppingCart = new userShopsModel(userShop);

        userShoppingCart.save()
        .then(() => {
            res.redirect("/products/user_Shopping_Cart/:id");
        
        })  
        
        
    })
    .catch(err=>console.log(`Error happened when adding products to shopping cart :${err}`));
    
});
router.get("/user_Shopping_Cart/:id", isAuthenticated, (req,res) => {
    
    userShopsModel.find({userId:req.session.userInfo._id})
    .then((products)=>{
  
        const AllProduct = products.map(product=>{

            return {

                productName: product.productName,
                productPrice: product.productPrice,
                productPhoto : product.productPhoto,
                id: req.session.userInfo._id
            }
        });

        res.render("product/shoppingCart", {
            title: "registerDashboard: buyPal.ca",
            headingInfo: "buyPal",
            product: AllProduct
        });
    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));  
    
});
router.delete("/shoppingCart/", isAuthenticated, (req,res)=>{
    //const orders = [];
    //const quantity = [];

    userShopsModel.find({userId:req.session.userInfo._id})
    .then((products)=>{
        
        
        const orders = products.map(product=>{

            return {

                productName: product.productName,
                productQuantity: product.quantityOrderd
            }
        });
       
        console.log(`product is: ${products}`);
        console.log(`orders is: ${orders}`);
        userShopsModel.deleteMany({userId:req.session.userInfo._id})
        .then(()=>{
            
            const {email, firstName} = req.session.userInfo;
            const sgMail = require('@sendgrid/mail');
            sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
            const msg = {
            to: `${email}`,
            from: 'zp.fakhar9675@gmail.com',
            subject: 'Your BuyPal order',
            html: `Hi ${firstName}, <br><br>
                Thank you for shopping with use!<br><br>
                You orderes, ${orders} whith the price of. <br> <br>
                Regards,<br><br>
                buyPal Team
                `,
            };
            sgMail.send(msg)
            .then(()=>{
                res.redirect("/user/profile"); 
            })
            .catch(err =>{
                console.log(err);
            })  
        })
    })
    
    .catch(err=>console.log(`Error happened when deleting data from the database :${err}`));

});

module.exports=router;