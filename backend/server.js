const dotenv = require('dotenv');     // 🔼 Move this to top
dotenv.config(); 

const express = require('express');
const cors = require('cors');
// const dotenv = require('dotenv');
const connectDB = require('./config/db.js'); // Adjust the path as necessary
const userRoutes = require('./routes/userRoutes.js'); // Adjust the path as necessary
const productRoutes = require('./routes/productRoutes.js'); // Adjust the path as necessary
const cartRoutes = require('./routes/cartRoutes.js'); // Adjust the path as necessary
const checkoutRoutes = require('./routes/checkoutRoutes.js'); // Adjust the path as necessary
const OrderRoutes = require('./routes/OrderRoutes.js'); // Adjust the path as necessary
const uploadRoutes = require('./routes/uploadRoutes.js'); // Adjust the path as necessary

const app = express();
app.use(express.json());
app.use(cors());

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

// connect to MongoDB
connectDB();


app.get('/', (req, res) => {
  res.send('Welcome to Garbline Api!');
});

// API routes
app.use('/api/users', userRoutes); // Adjust the path as necessary  
app.use('/api/products', productRoutes); // Adjust the path as necessary
app.use('/api/cart', cartRoutes); // Adjust the path as necessary
app.use('/api/checkout', checkoutRoutes); // Adjust the path as necessary
app.use('/api/orders', OrderRoutes); // Adjust the path as necessary
app.use('/api/upload', uploadRoutes); // Adjust the path as necessary



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
