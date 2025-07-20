const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = require('../routes/userRoutes');

// middleware to protect routes




// Middleware to protect routes
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]; // Get token from header

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.user.id).select('-password'); // Exclude password
            next(); // Proceed
        } catch (error) {
            console.error('Token verification failed:', error);

            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired. Please log in again.' });
            }

            return res.status(401).json({ message: 'Not authorized, token invalid.' });
        }
    } else {
        console.warn('No token provided');
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};


// const protect = async(req,res,next) =>{
//     let token;

//     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         try {
//             token = req.headers.authorization.split(' ')[1]; // Get token from header
//             // Verify token
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);


//             req.user = await User.findById(decoded.user.id).select('-password'); // Exclude password from user data
//             next(); // Call next middleware or route handler
//         }catch(error){
//             console.log('Token verifiaction failed:', error);
//             res.status(401).json({ message: 'Not authorized, token failed' });

//         }
//     } else{
//         console.log('No token provided');
//         res.status(401).json({ message: 'Not authorized, no token' });
//     }
// };

//middleware to check if the user is an admin
const admin = (req, res, next) => {   
    if(req.user && req.user.role === 'admin') {
        next(); // User is admin, proceed to next middleware or route handler
    } else {
        res.status(403).json({ message: 'Not Authorized as an admin ' }); // User is not admin
    }
}




module.exports = { protect,admin };