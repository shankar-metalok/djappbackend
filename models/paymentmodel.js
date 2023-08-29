const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  id: String,
  entity: String,
  amount: Number,
  amount_paid: Number,
  amount_due: Number,
  currency: String,
  receipt: String,
  offer_id: String,
  status: String,
  attempts: Number,
  notes: Array,
  created_at: Number,
});

const Order = mongoose.model('payments', orderSchema);
module.exports = Order;
