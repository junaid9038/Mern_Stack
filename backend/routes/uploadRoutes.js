const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');



require('dotenv').config(); // Load environment variables

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,  
});

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post('/', upload.single('image'), async (req, res) => {
     try {
        if(!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // fuction to handle the stream upload to Cloudinary
        const streamUpload = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream((error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                });
                // Use stramifier to convert the file buffer to a stream
                streamifier.createReadStream(fileBuffer).pipe(stream);
            });
        }

        // call the stream upload function
        const result = await streamUpload(req.file.buffer);
        // return the uploaded image URL
        res.json({ imageUrl: result.secure_url });
     } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Server error' });
     }
})

,
module.exports = router;