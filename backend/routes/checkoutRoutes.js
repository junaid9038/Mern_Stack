const express = require('express');
const Checkout = require('../models/Checkout'); // Import the Checkout model
const Cart = require('../models/Cart'); // Import the Cart model
const Product = require('../models/Product'); // Import the Product model
const Order = require('../models/Order'); // Import the Order model
const { protect } = require('../middleware/authMiddleware'); // Import the protect middleware
const { checkout } = require('./userRoutes');
// const { use } = require('react');



const router = express.Router();

//@route   POST /api/checkout
//@desc    Create a new checkout session
//@access  Private

router.post('/', protect, async (req, res) => {
    console.log("Incoming body:", req.body); // Debug

    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!checkoutItems || checkoutItems.length === 0) {
        return res.status(400).json({ message: 'No items in checkout' });
    }

    try {
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "Pending",
            isPaid: false,
        });

        console.log(`Checkout created for user: ${req.user._id}`);
        res.status(201).json(newCheckout);

    } catch (error) {
        console.error('Error creating checkout session:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});



// router.post('/', protect, async (req, res) => {
//     const{checkoutItems,shippingAddress,paymentMethod,totalPrice} = req.body;
//     if(checkoutItems||checkoutItems.length === 0){
//         return res.status(400).json({message: 'No items in checkout'});
//     }

//     try {
//         // Create a new checkout session
//         const newCheckout = new checkout.create({
//             user: req.user._id,
//             checkoutItems:checkoutItems,
//             shippingAddress,
//             paymentMethod,
//             totalPrice,
//             paymentStatus:"Peding", // Default to Pending
//             isPaid: false, // Default to false
//         });
//         console.log(`checkout created for user: ${req.user._id}`);
//         res.status(201).json(newCheckout);

//     } catch (error) {
//         console.error('Error creating checkout session:', error);
//         return res.status(500).json({ message: 'Server error' });
        
//     }
// })


//@route  PUT /api/checkout/:id/pay
//dess Update checkout to mark as paid after successful payment
//@access Private

router.put('/:id/pay', protect, async (req, res) => {
    const{paymentStatus, paymentDetails} = req.body;

    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({ message: 'Checkout not found' });
        }
        if(paymentStatus === "paid"){
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus; // Update payment status
            checkout.paymentDetails = paymentDetails; // Store payment details
            checkout.paidAt = Date.now(); // Set the paid date
            await checkout.save();

            return res.status(200).json(checkout);  

        }else {
            return res.status(400).json({ message: 'Payment failed or not completed' });
        }   
    } catch (error) {
        console.error('Error updating checkout payment:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});


//@route POST /api/checkout/:id/finalize
//@desc Finalize checkout and convert to an order after payment confirmation
//@access Private

router.post('/:id/finalize', protect, async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({ message: 'Checkout not found' });
        }
        if(checkout.isPaid && !checkout.isFinalized) {
            // Create final order based on the checkout details
            const finalOrder = await Order.create({
                user: checkout.user,
                orderItems:checkout.orderItems,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStatus: "paid", // Update payment status
                paymentDetails: checkout.paymentDetails, // Store payment details
            });

            // Mark the checkout as finalized
            checkout.isFinalized = true;
            checkout.finalizedAt = Date.now(); // Set the finalized date
            await checkout.save();

            // Delete the cart associated with the user
            await Cart.findOneAndDelete({ user: checkout.user });
            res.status(201).json(finalOrder);
        }else if(checkout.isFinalized) {
            return res.status(400).json({ message: 'Checkout already finalized' }); 
        }
        else {  
            return res.status(400).json({ message: 'Checkout not paid or already finalized' });
        }

    } catch (error) {
        console.error('Error finalizing checkout:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;