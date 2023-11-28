
const modelPath = 'D:/pelajaran kuliah/semester 7/capstone/pregnagrowth/Cloud_Computing/v1/dataset/Model_18.h5';

const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const tf = require('@tensorflow/tfjs');
const prisma = new PrismaClient();


async function loadModel() {
    try {
        const fileBuffer = await fs.readFile(modelPath);
        const model = await tf.loadLayersModel(tf.io.browserFiles([{
            name: 'model',
            data: fileBuffer.buffer,
        }]));
        return model;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function predictWithFile(file) {
    try {
        const model = await loadModel();
        const prediction = model.predict(tf.tensor([file]));
        const predictionData = await prediction.data();
        return predictionData;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function postProcessPrediction(prediction) {
    try {
        const labels = JSON.parse(fs.readFileSync('D:/pelajaran kuliah/semester 7/capstone/pregnagrowth/Cloud_Computing/v1/dataset/labels.json'));
        const label = labels[prediction.indexOf(Math.max(...prediction))];
        return label;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function uploadPrediction(url, prediction) {
    try {
        const upload = await prisma.upload.create({
            data: {
                url,
                prediction,
            },
        });
        return upload;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const predict = async (req, res) => {
    try {
        const result = await predictWithFile(req.file.buffer);
        const prediction = await postProcessPrediction(result);
        const image = req.file.originalname;
        const upload = await uploadPrediction(image, prediction);
        return res.status(200).json({
            success: true,
            upload,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllPrediction = async (req, res) => {
    try {
        const predictions = await prisma.upload.findMany();
        return res.status(200).json({
            success: true,
            predictions,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getAllPrediction,
    predict,
};
