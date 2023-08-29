const User = require('../models/userschema');

exports.createUser = async (req, res) => {
 

    try {
        const { username, email , password, confirmpassword} = req.body;
    
    
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(409).json({ message: "User with this email already exists." });
        }
        const newUser = new User({ username, email , password,confirmpassword, account_balance: 0, });
    
        await newUser.save();
    
        res.status(201).json(newUser);
    
        console.log("userdata",username, email , password,confirmpassword)
      } catch (err) {
        res.status(400).json({ message: err.message });
      }


};

exports.loginUser = async (req, res) => {
 

    try {
        const { email, password } = req.body;
    
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
    
        if (password !== user.password) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
    
        res.cookie('session', 'your-session-id', { httpOnly: true });
        res.status(200).json({ message: "Login successful" ,user});
        
    
    
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
      console.log('login successfully')



};

exports.updateAccountBalance = async (req, res) => {


    try {
        const userId = req.params.userId;
        const { additionalAmount } = req.body;
        console.log("Received userId:", userId);
        console.log("Received additionalAmount:", additionalAmount);
        console.log("Request body:", req.body);
    
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        const newAccountBalance = user.account_balance + additionalAmount;
        user.account_balance = newAccountBalance;
        await user.save();
    
        res.status(200).json({ message: "Account balance updated successfully" });
      } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Internal server error" });
      }



};

exports.makePurchase = async (req, res) => {
 


    try {
        const userId = req.params.userId;
        const { purchaseAmount } = req.body; 
    
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        if (user.account_balance < purchaseAmount) {
          return res.status(400).json({ message: "Insufficient account balance" });
        }
    
        const newAccountBalance = user.account_balance - purchaseAmount;
        user.account_balance = newAccountBalance;
        await user.save();
    
        res.status(200).json({ message: "Purchase successful" });
      } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Internal server error" });
      }



};
