const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
    productName:
    {
        type:String,
        required: true
    },
    productPrice:
    {
        type: String,
        required: true
    },
    productDescription:
    {
        type: String
    },
    productCategory:
    {
        type: String,
        required: true
    },
    productQuantity:
    {
        type: String,
        required: true
    },
    bestSeller:
    {
        type: String,
        required: true
    },
    productPhoto:
    {
        type: String  
    },
    dateCreated:
    {
        type: Date,
        default: Date.now()
    }
});

const productModel = mongoose.model('Product_list', productSchema);
module.exports=productModel;

