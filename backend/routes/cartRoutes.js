const express = require('express');
const Product = require('../models/Product'); // Import the Product model   
const Cart = require('../models/Cart'); // Import the Cart model
const { protect } = require('../middleware/authMiddleware'); // Import the protect middleware


const router = express.Router();

// helper function to get cart for a user Id or guest id
const getCart = async (userId, guestId) => {
    if (userId) {
        // If user is logged in, find cart by user ID
        return await Cart.findOne({ user: userId });
    } else if (guestId) {
        // If guest, find cart by guest ID
        return await Cart.findOne({ guestId });
    } else {
        // If neither, return null
        return null;
    }
};



//@route   POST /api/cart
//@desc    Add a product to cart for a guest or logged in user
//@access  Public
router.post('/',  async (req, res) => {
    const { productId, quantity,size,color,guestId,userId } = req.body;

    try {
        // Find the product by ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        //Determine if the user is logged in or a guest
        let cart = await getCart(userId, guestId);

        // if the cart exists, update it
        if (cart) {

            const productIndex = cart.products.findIndex(
                (p)=>
                    p.productId.toString() === productId &&
                    p.size === size &&  
                    p.color === color
            );

            if (productIndex > -1) {
                // If product already exists in cart, update quantity
                cart.products[productIndex].quantity += quantity;
            } else {
                // If product does not exist, add it to the cart
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity,
                });
            }

            // Recalculate total price
            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
            await cart.save();
            return res.status(200).json(cart);
        } else {
            // create a new cart for the guest or user
            const  newCart = await Cart.create({
                user: userId ? userId : undefined,
                guestId: guestId ? guestId : "guest_" + new Date().getTime(), // Generate a unique guest ID
                products: [{
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity,
                }],
                totalPrice: product.price * quantity, // Set initial total price
            });
            return res.status(201).json(newCart);
        }
    } catch (error) {
        console.error('Error adding product to cart:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

//@route   PUT /api/cart
//@desc    update product quantity in cart for a guest or logged in user
//@access  Public

router.put('/', async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;

    try {
        // Find the cart for the user or guest
        let cart = await getCart(userId, guestId);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the product in the cart
        const productIndex = cart.products.findIndex(
            (p) =>
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
        );

        if (productIndex > -1) {
           //update quanity
           if(quantity <= 0) {
                cart.products[productIndex].quantity = quantity;
            }
            else {
                cart.products.splice(productIndex, 1);// Remove the product from the cart if quantity is 0
            }
            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
            await cart.save();
            return res.status(200).json(cart);
        }else {
            return res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        console.error('Error updating product in cart:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}); 


//@route   Delete /api/cart
//@desc    Remove a product from cart for a guest or logged in user
//@access  Public   

router.delete('/', async (req, res) => {
    const { productId, size, color, guestId, userId } = req.body;   
    try {
        // Find the cart for the user or guest
        let cart = await getCart(userId, guestId);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the product in the cart
        const productIndex = cart.products.findIndex(
            (p) =>
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
        );

        if (productIndex > -1) {
            // Remove the product from the cart
            cart.products.splice(productIndex, 1);
            // Recalculate total price
            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        console.error('Error removing product from cart:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

//@route   GET /api/cart
//@desc    Get cart for a guest or logged in user   
//@access  Public

router.get('/', async (req, res) => {
    const { userId,guestId } = req.query;
    try {
        // Find the cart for the user or guest
        const cart = await getCart(userId, guestId);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        return res.status(200).json(cart);
    } catch (error) {
        console.error('Error fetching cart:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}
);

//@route   GET /api/cart/merge
//@desc    Merge guest cart with user cart
//@access  Public

router.get('/merge', protect, async (req, res) => {
    const {guestId } = req.body;

    try {
        // Find the guest cart and user cart
        const guestCart = await Cart.findOne({ guestId });
        const userCart = await Cart.findOne({ user: req.user._id });

        if(guestCart){
            if(guestCart.products.length === 0) {
                return res.status(400).json({ message: 'No products in guest cart to merge' });
            }
            if(userCart){
                // Merge guest cart into user cart
                guestCart.products.forEach((guestItem) => {
                    const productIndex = userCart.products.findIndex(
                        (item) =>
                            item.productId.toString() === guestItem.productId.toString() &&
                            item.size === guestItem.size &&
                            item.color === guestItem.color   
                    );    

                    if (productIndex > -1) {
                        // If product already exists in user cart, update quantity
                        userCart.products[productIndex].quantity += guestItem.quantity;
                    } else {
                        // If product does not exist, add it to the user cart
                        userCart.products.push(guestItem);
                    }
                });
                // Recalculate total price
                userCart.totalPrice = userCart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
                await userCart.save();
               
                //Remove the guest cart merging

                try {
                    await Cart.findByIdAndDelete(guestId);
                }catch (error) {
                    console.error('Error deleting guest cart:', error);
                }
                res.status(200).json(userCart);
            }else{
                //if the user has no existing cart,assign the guest cart to the user
                guestCart.user = req.user._id; // Assign the user ID to the cart
                guestCart.guestId = undefined; // Remove the guest ID
                await guestCart.save();
                res.status(200).json(guestCart);
            }
        }else{
            if(userCart){
                // Guest cart has alreday been merged, return user cart
                return res.status(200).json(userCart);
            }
            res.status(404).json({ message: 'No guest cart found to merge' });
        }
    } catch (error) {
        console.error('Error merging carts:', error);
        return res.status(500).json({ message: 'Server error' });
    }});

module.exports = router;