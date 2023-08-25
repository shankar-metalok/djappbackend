const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: Number,
    required: true,
  },
  
  password: {
    type: String,
    required: true,
  },
 
  confirmpassword: {
    type: String,
    required: true,

    // validate: {
    //   validator: function (value) {
    //     return value === this.password;
    //   },
    //   message: 'Passwords do not match',
    // },
    
  },


  account_balance: {
    type: Number,
    default: 0, 
  },

});

module.exports = mongoose.model('User', userSchema);

