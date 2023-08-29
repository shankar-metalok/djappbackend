const Successpayment = require('../models/successpaymentmodel');

exports.successpayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id, amount } = req.body;

    const newsuccess = new Successpayment({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      order_id,
      amount,
    });

    await newsuccess.save();

    console.log('Payment details saved:', newsuccess);

    res.status(201).json(newsuccess);
  } catch (error) {
    console.error('Error storing success payment details:', error);
    res.status(500).json({ success: false, error: 'Failed to store success payment details.' });
  }
};
