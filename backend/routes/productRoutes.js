
const express = require('express');
const Product= require('../models/Product'); // Import the Product model
const {protect ,admin} = require('../middleware/authMiddleware'); // Import the protect middleware 
const User = require('../models/User');

const router = express.Router();

// @route POST /api/products
// @desc Create a new product
// @access Private (Admin only)

router.post('/', protect, admin, async (req, res) => {
    try {
        const{
            name,
            description,
            price,
            discountedPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collection,
            material,
            gender,
            images,
            isfeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku
        } = req.body;

        const product  = new Product({
            name,
            description,
            price,
            discountedPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collection,
            material,
            gender,
            images,
            isfeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
            user: req.user._id // Associate the product with the user who created it
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
        
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


//@route PUT /api/products/:id
// @desc Update a product
// @access Private (Admin only)

router.put('/:id',protect,admin, async(req,res) =>{
    try {
        const{
            name,
            description,
            price,
            discountedPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collection,
            material,
            gender,
            images,
            isfeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku
        } = req.body;
        
        // Find the product by ID
        const product = await Product.findById(req.params.id);
        if(product) {
            product.name = name || product.name;
            product.description = description || product.description;   
            product.price = price || product.price;
            product.discountedPrice = discountedPrice || product.discountedPrice;   
            product.countInStock = countInStock || product.countInStock;
            product.category = category || product.category;
            product.brand = brand || product.brand;
            product.sizes = sizes || product.sizes;
            product.colors = colors || product.colors;
            product.collection = collection || product.collection;
            product.material = material || product.material;
            product.gender = gender || product;
            product.images = images || product.images;
            product.isfeatured =
              isfeatured !== undefined ? isfeatured : product.isfeatured; // Check if isfeatured is provided, otherwise keep the existing value
            product.isPublished = 
              isPublished !== undefined ? isPublished : product.isPublished; // Check
            product.tags = tags || product.tags;
            product.dimensions = dimensions || product.dimensions;
            product.weight = weight || product.weight;
            product.sku = sku || product.sku;


            // Save the updated product
            const updatedProduct = await product.save();
            res.json(updatedProduct);
        }else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server 1 error');
    }
});


//@route Delete /api/products/:id
// @desc Delete a productby ID
// @access Private (Admin only)

router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne(); // Delete the product
            // Optionally, you can also remove the product from the user's products array if needed
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

//@route GET /api/products
// @desc Get all products with optional filters
// @access Public

router.get('/', async (req, res) => {
    try {
        const {collection,sizes,colors,gender,minPrice,maxPrice,sortBy,search,category,material,limit} = req.query;

        let query = {};

        //filter logic

        if (collection && collection.toLocaleLowerCase() !== 'all') {
            query.collection = collection;
        }  
        if (category && category.toLocaleLowerCase() !== 'all') {
            query.category = category;
        }   
        if(material){
            query.material = {$in: material.split(',')};
        }
        
         if(sizes){
            query.sizes = {$in: sizes.split(',')};
        }
        if(colors){
            query.colors = {$in: [colors]};    
        }
        if(gender){
            query.gender= gender
        }
        if(minPrice || maxPrice){
            query.price = {};
            if(minPrice) {
                query.price.$gte = Number(minPrice);
            }
            if(maxPrice) {
                query.price.$lte = Number(maxPrice);
            }
        }
        if(search){
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' }}
            ]
        }
        // Sorting logic
        let sort = {};
        if(sortBy){
            switch(sortBy) {
                case 'priceAsc':
                    sort = { price: 1 };
                    break;
                case 'priceDesc':
                    sort = { price: -1 };   
                    break;
                case 'Popularity':
                    sort = {rating: -1}; // Assuming you have a rating field    
                    break;
                    default:
                        break;                        
        } }
// Fetch products and apply sorting and limit

        let products = await Product.find(query).sort(sort).limit(Number(limit) || 0);
        res.json(products);

    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });
    }
})

//@route GET /api/products/best-sellers
// @desc Get best-selling products with higest ratings
// @access Public
router.get('/best-seller', async (req, res) => {
    try {
        const bestSeller = await Product.findOne().sort({ratings: -1}); // Assuming you have a ratings field
        if(bestSeller) {
            res.json(bestSeller);
        } else {
            res.status(404).json({ message: 'No best-selling products found' });
        }
    }catch (error) {
        console.error('Error fetching best-selling products:', error);  
        res.status(500).json({ message: 'Server error' });
    }
});


//@route GET /api/products/new-arrivals
//@desc retrieve latest 8 products - creation date
// @access Public   

router.get('/new-arrivals', async (req, res) => {
    try {
        //Fetch the latest 8 products based on creation date
        const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
        res.json(newArrivals);
    } catch (error) {
        console.error('Error fetching new arrivals:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


//@route GET /api/products/:id
// @desc Get a single product by ID 
// @access Public

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route GET /api/products/similar/:id
// @desc Get similar products based on category 
// @access Public

router.get('/similar/:id', async (req, res) => {
    const {id} = req.params;
   
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find similar products based on the same category
        const similarProducts = await Product.find({
            _id: { $ne: product._id }, // Exclude the current product
            gender: product.gender, // Match
            category: product.category, // Match the same category
        }).limit(4); // Limit to 5 similar products

        res.json(similarProducts);
    } catch (error) {
        console.error('Error fetching similar products:', error);
        res.status(500).json({ message: 'Server error' });
    }   
});

//@route GET /api/products/best-sellers
// @desc Get best-selling products with higest ratings
// @access Public
// router.get('/best-sellers', async (req, res) => {
//     try {
//         const bestSellers = await Product.find({ isfeatured: true })
//             .sort({ ratings: -1 }) // Sort by ratings in descending order
//             .limit(5); // Limit to 5 best-selling products

//         res.json(bestSellers);
//     } catch (error) {
//         console.error('Error fetching best-selling products:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });


module.exports = router;