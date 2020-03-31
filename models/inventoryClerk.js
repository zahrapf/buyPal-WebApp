const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const inventoryClerkSchema = new Schema({
    productName:
    {
        type:String,
        required: true
    },
    productPrice:
    {
        type: Number,
        required: true
    },
    productDescription:
    {
        type: String,
        required: true
    },
    productCategory:
    {
        type: String,
        required: true
    },
    productQuantity:
    {
        type: Number,
        required: true
    },
    bestSeller:
    {
        type: Boolean,
        required: true
    },
    
    dateCreated:
    {
        type: Date,
        default: Date.now()
    }
});



const registerModel = mongoose.model('Registered_user', registrationSchema);
module.exports=registerModel;