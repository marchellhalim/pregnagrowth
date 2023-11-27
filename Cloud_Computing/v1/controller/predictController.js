const express = require('express')
const tf = require('@tensorflow/tfjs');
const fs = require('fs');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const modelPath = '../dataset/Model_18.h5'

async function loadModel() {
    try {
        const model = await tf.loadLayersModel(`file://${modelPath}`);
        return model;
    } catch (error) {
        console.log(error);
    }
}

//upload prediction with tensorflow and predict with file h5
async function predictWithFile(file) {
    try {
        const model = await loadModel();
        const prediction = await model.predict(tf.tensor([file]));
        const predictionData = await prediction.data();
        return predictionData;
    } catch (error) {
        console.log(error);
    }
}


//post process prediction
async function postProcessPrediction(prediction) {
    try {
        const labels = JSON.parse(fs.readFileSync('../dataset/labels.json'));
        const label = labels[prediction.indexOf(Math.max(...prediction))];
        return label;
    } catch (error) {
        console.log(error);
    }
}

//upload prediction to database
async function uploadPrediction(url, prediction) {
    try {
        const upload = await prisma.upload.create({
            data: {
                url,
                prediction
            }
        });
        return upload;
    } catch (error) {
        console.log(error);
    }
}

//predict
const predict = async (req, res) => {
    try {
        const result = await predictWithFile(req.file.buffer);
        const prediction = await postProcessPrediction(result);
        const image = req.file.originalname;
        const upload = await uploadPrediction(image, prediction);
        return res.status(200).json({
            success: true,
            upload
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}




//get all prediction
const getAllPrediction = async (req, res) => {
    try {
        const predictions = await prisma.upload.findMany();
        return res.status(200).json({
            success: true,
            predictions
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    getAllPrediction,
    predict,
}

