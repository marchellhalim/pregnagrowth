const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

// getAllFaQ
const getAllFaQ = async (req, res) => {
    try {
        const faqs = await prisma.faq.findMany();
        return res.status(200).json({
            success: true,
            faqs
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//getByIdFaQ
const getByIdFaQ = async (req, res) => {
    try {
        const { id } = req.params;
        const faq = await prisma.faq.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!faq) {
            return res.status(404).json({
                success: false,
                message: 'FaQ not found'
            });
        }
        return res.status(200).json({
            success: true,
            faq
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//getByQuestionFaQ is String
const getByQuestionFaQ = async (req, res) => {
    try {
        const { question } = req.params;
        const faq = await prisma.faq.findFirst({
            where: {
                question: {
                    contains: question
                }
            }
        });
        if (!faq) {
            return res.status(404).json({
                success: false,
                message: 'FaQ not found'
            });
        }
        return res.status(200).json({
            success: true,
            faq
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//getByQuestionFaQByKeyword
const getByQuestionFaQByKeyword = async (req, res) => {
    try {
        const { keyword } = req.params;
        const faq = await prisma.faq.findMany({
            where: {
                OR: [
                    {
                        question: {
                            contains: keyword
                        }
                    },
                    {
                        answer: {
                            contains: keyword
                        }
                    }
                ]
            }
        });
        if (!faq) {
            return res.status(404).json({
                success: false,
                message: 'FaQ not found'
            });
        }
        return res.status(200).json({
            success: true,
            faq
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//createFaQ
const createFaQ = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const faq = await prisma.faq.create({
            data: {
                question: question,
                answer: answer
            }
        });
        return res.status(201).json({
            success: true,
            faq
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    getAllFaQ,
    getByIdFaQ,
    getByQuestionFaQ,
    getByQuestionFaQByKeyword,
    createFaQ
}

