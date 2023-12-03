const express = require('express');
const router = express.Router();
const predictController = require('../controller/predictController');
const multer = require('multer');
const path = require('path');
const tf = require('@tensorflow/tfjs');
const { loadLayersModel } = require('@tensorflow/tfjs');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, 'image-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res) => {
    let image = req.file.filename;
    let model = await loadLayersModel('file://../dataset/labels.json');
    let tensor = tf.image.resizeBilinear(tf.image.decodeJpeg(tf.node.decodeImage(req.file.buffer)), [224, 224]);
    tensor = tf.cast(tensor, 'float32');
    tensor = tf.expandDims(tensor, 0);
    let prediction = await model.predict(tensor).data();
    let result = [];
    for (let i = 0; i < prediction.length; i++) {
        result.push({
            class: i,
            probability: prediction[i]
        });
    }
    result.sort((a, b) => {
        return b.probability - a.probability;
    });
    res.status(200).json({
        success: true,
        data: {
            image: image,
            prediction: result
        }
    });
}
);

router.get('/', predictController.getAllPrediction);

module.exports = router;
