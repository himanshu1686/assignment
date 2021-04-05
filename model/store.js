const mongoose = require('mongoose')
const storeSchema =new  mongoose.Schema({
    Item_Name:String, 
    USPart:String,
    UK_Part_No:String,
    Price:Number,
    Striked_Price:Number,
    Quantity:Number,
    In_Stock:Boolean,
    Category:String,
    Show_before_login:Boolean, 
    Tags:String, 
    Description:String,
    Image_Link:String   
});
module.exports = mongoose.model('store',storeSchema);
