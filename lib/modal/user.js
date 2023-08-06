const mongoose = require('mongoose');


const Schema = mongoose.Schema({
  name: { type: String, require: true },
  date: { type: String, require: true },
  slot: { type: Array, lowercase: true, require: true },
  mobile_number: { type: String, require: true },
  email: { type: String, require: true },
  sport: { type: String },
  price: { type: Number },
  merchantTransactionId: { type: String },
  merchantUserId: { type: String },
  isPaymentStatus: { type: Boolean, default: false },
  success: { type: Boolean },
  code: { type: String },
  message: { type: String },
  data: { type: Object },
  verificationCode: { type: String }
}, { timestamps: true })


const User = mongoose.model('users', Schema);
module.exports = User;