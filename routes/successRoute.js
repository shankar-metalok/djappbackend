const express = require('express');
const router = express.Router();
const successpaymentController = require('../controllers/successpayment')

router.post('/successpayment',successpaymentController.successpayment)

module.exports = router;
