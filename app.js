const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const successRoutes = require('./routes/successRoute')

const app = express();
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://shankarmeta:shankarmeta@clustedj.kgjwgag.mongodb.net/?retryWrites=true&w=majority",
  ).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.use('/users', userRoutes);
app.use('/payments', paymentRoutes);
app.use('/success', successRoutes )

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
