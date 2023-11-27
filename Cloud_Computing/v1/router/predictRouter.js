const express = require('express')
const router = express.Router();
const predictController = require('../controller/predictController');
const multer = require('multer');

const stroge = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: stroge })

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const result = await predictController.predict(req, res);
        return res.status(200).json({
            success: true,
            result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
);

router.get('/', predictController.getAllPrediction);

module.exports = router;