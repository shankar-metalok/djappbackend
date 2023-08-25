

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://shankarmeta:shankarmeta@clustedj.kgjwgag.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });




const User = require("./userschema");
app.post("/usersdata", async (req, res) => {
  try {
    const { username, email,phonenumber , password,confirmpassword} = req.body;

    const newUser = new User({ username, email,phonenumber , password,confirmpassword, account_balance: 0, });

    await newUser.save();

    res.status(201).json(newUser);

    console.log("userdata",username, email,phonenumber , password,confirmpassword)
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});







app.post("/login", async (req, res) => {
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
});




// account_balance adding 
app.put("/update-account-balance/:userId", async (req, res) => {
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
});




// user buy something 

app.put("/make-purchase/:userId", async (req, res) => {
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
});












const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

