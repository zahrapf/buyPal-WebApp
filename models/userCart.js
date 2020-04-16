const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userCartSchema = new Schema({
    userId:
    {
        type:String,
        required: true
    },
    productId:
    {
        type: String,
        required: true
    },
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
    productPhoto:
    {
        type: String  
    },
    quantityOrderd:
    {
        type: String,
       // required: true
    },
    dateCreated:
    {
        type: Date,
        default: Date.now()
    }
});

const userShopsModel = mongoose.model('user_ShoppingCart', userCartSchema);
module.exports=userShopsModel;

