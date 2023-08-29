const mongoose = require('mongoose');

const successSchema = new mongoose.Schema({
    razorpay_order_id:String,
    razorpay_payment_id:String,
    razorpay_signature:String,
    order_id:String, 
    amount:Number
});

const Order = mongoose.model('successpayments', successSchema);
module.exports = Order;