const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                role: true
            }
        });
        return res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                role: true
            }
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, password, name } = req.body;
        const user = await prisma.user.update({
            where: {
                id: parseInt(id)
            },
            data: {
                email,
                password,
                name
            }
        });
        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.delete({
            where: {
                id: parseInt(id)
            }
        });
        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}
