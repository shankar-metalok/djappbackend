const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

router.post('/usersdata', userController.createUser);
router.post('/login', userController.loginUser);
router.put('/update-account-balance/:userId', userController.updateAccountBalance);
router.put('/make-purchase/:userId', userController.makePurchase);
// const paymentRoutes = require('./routes/paymentRoutes');


module.exports = router;
