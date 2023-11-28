const express = require('express');
const router = express.Router();
const predictController = require('../controller/predictController');
const multer = require('multer');
const path = require('path');
const tf = require('@tensorflow/tfjs');

// Set up Multer for file uploading
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
  });
  
  const upload = multer({ storage });
  
  // Define the endpoint for uploading an image and predicting its freshness
router.post('/', upload.single('image'), async (req, res) => {
    // Load the machine learning model
    const model = require('../dataset/Model_18.h5');
  
    // Read the uploaded image
    const image = tf.image.decodeImage(req.file.buffer);
    const prediction = model.predict(image);
  
    // Determine the freshness based on the prediction
    const freshness = prediction[0][0] > 0.5 ? 'Fresh' : 'Spoiled';
  
    res.json({
      freshness: freshness,
    });
  });

router.get('/', predictController.getAllPrediction);

module.exports = router;
