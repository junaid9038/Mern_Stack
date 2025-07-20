const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product'); // Adjust the path as necessary
const User = require('./models/User'); // Adjust the path as necessary  
const Cart = require('./models/Cart'); // Adjust the path as necessary
const products = require('./data/products'); // Adjust the path as necessary    

dotenv.config();    

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Function to seed the database
const seedData = async () => {
    try {
        // Clear existing data
        await Product.deleteMany(); 
        await User.deleteMany();
        await Cart.deleteMany(); // Clear Cart collection if needed

        // Create admin user
        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: '123456',
            role: 'admin',
        }); 

        // Use correct variable name here
        const userID = adminUser._id;

        // Assign the admin user ID to each product
        const sampleProducts = products.map((product) => {
            return { ...product, user: userID };  
        });

        // Insert sample products into the database
        await Product.insertMany(sampleProducts);
        console.log('✅ Data seeded successfully');
        process.exit(); // Exit the process after seeding
    } catch (error) {
        console.error('❌ Error seeding data:', error);
        process.exit(1); // Exit with an error code
    }
}

seedData(); // Call the seed function to start the seeding process






// const mongoose= require('mongoose');
// const dotenv = require('dotenv');
// const Product = require('./models/Product'); // Adjust the path as necessary
// const User = require('./models/User'); // Adjust the path as necessary  
// const products = require('./data/products'); // Adjust the path as necessary    


// dotenv.config();    

// // Connect to MongoDB

// mongoose.connect(process.env.MONGO_URI);

// // Function to seed the database

// const seedData = async () => {
//     try {
//         //clerar existing data
//         await Product.deleteMany(); 
//         await User.deleteMany();

//         // Create admin user
//         const adminUser = await User.create({
//              name: 'Admin User',
//             email: 'admin@example.com',
//             password: '123456',
//             role: 'admin',
//         }); 

//         //Asign the default user id to each product

//         const userID = createdUser._id;

//         const sampleProducts = products.map((product) => {
//             return { ...product, user:userID }; // Assign the user ID to each product  
//         });
//         // Insert sample products into the database
//         await Product.insertMany(sampleProducts);
//         console.log('Data seeded successfully');
//         process.exit(); // Exit the process after seeding
//     } catch (error) {
//         console.error('Error seeding data:', error);
//         process.exit(1); // Exit with an error code
        
//     }
// }

// seedData(); // Call the seed function to start the seeding process
