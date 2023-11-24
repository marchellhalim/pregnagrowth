const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllProfile = async (req, res) => {
    try {
        const profile = await prisma.profile.findMany();
        return res.status(200).json({
            success: true,
            profile
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getProfileById = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await prisma.profile.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            });
        }
        return res.status(200).json({
            success: true,
            profile
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const createProfile = async (req, res) => {
    try {
        const { bio, berat_badan, umur_janin, jam_tidur, userId } = req.body;
        const profile = await prisma.profile.create({
            data: {
                bio,
                berat_badan,
                umur_janin,
                jam_tidur,
                userId
            }
        });
        return res.status(200).json({
            success: true,
            profile
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { bio, berat_badan, umur_janin, jam_tidur, userId } = req.body;
        const profile = await prisma.profile.update({
            where: {
                id: parseInt(id)
            },
            data: {
                bio,
                berat_badan,
                umur_janin,
                jam_tidur,
                userId
            }
        });
        return res.status(200).json({
            success: true,
            profile
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
    getAllProfile,
    getProfileById,
    createProfile,
    updateProfile
}
