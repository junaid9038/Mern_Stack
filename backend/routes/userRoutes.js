const express =require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/authMiddleware'); // Import the protect middleware

const router = express.Router();

//@route POST /api/users/register
//@desc Register a new user
//@access Public
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // registration logic
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Create new user
        user = new User({
            name,
            email,
            password,
        });
        await user.save();

        // Generate JWT token
        const payload = {user:{id: user._id,role: user.role}};
        //sign and return the token along with user data
        jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: '1h'}, (err, token) => {
            if (err) throw err;
            // send the user and token in the response
            res.status(201).json({
                
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token,
            });
        });
        
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }

    
});

//@route POST /api/users/login
//@desc Authenticate user and return token
//@access Public

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try{
        // Find user by email
        let user = await User.findOne({email});

        if(!user) return res.status(400).json({ message: 'Invalid credentials' });
        // Check password
        const isMatch = await user.matchPassword(password);

        if(!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT token
        // Generate JWT token
        const payload = {user:{id: user._id,role: user.role}};
        //sign and return the token along with user data
        jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: '1h'}, (err, token) => {
            if (err) throw err;
            // send the user and token in the response
            res.json({
                
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token,
            });
        });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

//@route GET /api/users/profile
//@desc Get logged-in user profile (protected route)
//@access Private

router.get('/profile', protect,async (req, res) => {
    res.json(req.user);
});



module.exports = router;