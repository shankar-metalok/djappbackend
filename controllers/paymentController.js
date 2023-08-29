const Razorpay = require('razorpay');
const Order = require('../models/paymentmodel');

const instance = new Razorpay({
  key_id: 'rzp_test_AsieLfVYqPqP2J',
  key_secret: 'J7fiHt2fuHkANZ5zBGUl7Ueh',
});

exports.createPayment = async (req, res) => {
  try {
    const { amount, notes } = req.body;

    const order = await instance.orders.create({
      amount: amount,
      currency: 'INR',
      receipt: 'order1234',
    });

    const newOrder = new Order({
      ...order,
      notes: notes,
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      order,
      amount,
    });





























    console.log('Order created:', order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, error: 'Failed to create order.' });
  }
};
