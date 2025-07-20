const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    discountedPrice: {
        type: Number,
    },
    countInStock: {
        type: Number,
        required: true,
    },
    sku:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    category: {
        type: String,   
        required: true,
        trim: true,
    },
    brand: {
        type: String,
        required: true,
        trim: true,
    },
    sizes: {
        type: [String], // Array of strings for sizes   
        required: true,
    },
    colors: {
        type: [String], // Array of strings for colors
        required: true,
    },
    collections: {
        type: String,
        required: true,
        trim: true,
    },
    material: {
        type: String,   
    },
    gender: {
        type: String,
        enum:["Men","Women","Unisex"],
        required: true,
    },
   images: [{
        url: {
            type: String,
            required: true,
        },
        altText: {
            type: String,
            required: true,
        },
   }],
   isfeatured: {
        type: Boolean,
        default: false,
    },
    isPublished: {
        type: Boolean,
        default: false, // Indicates if the product is published       
    },
    ratings: {
        type: Number,
        default: 0,
       
    },
    numReviews: {
        type: Number,
        default: 0,
    },
    tags: {
        type: [String], // Array of strings for tags
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    metaTitle: {
        type: String,
        trim: true,
    },
    metaDescription: {
        type: String,
        trim: true,
    },
    metaKeywords: {
        type: [String], // Array of strings for meta keywords
    },
    dimensions: {
        length: Number,
        width: Number,
        height: Number,
    },
    weight: {
        type: Number,
       
    },


}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});


module.exports = mongoose.model('Product', productSchema);
