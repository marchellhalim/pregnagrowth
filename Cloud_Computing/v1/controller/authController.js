const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const login = async (req, res) => {
    // login with email or username and password
    try{
        const { email, password } = req.body;
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        email: email
                    },
                    {
                        username: email
                    }
                ]
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
        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: 'Wrong password'
            });
        }
        if (user.role.name !== 'user') {
            return res.status(401).json({
                success: false,
                message: 'You are not authorized'
            });
        }
        const token = jwt.sign({
            id: user.id,
            email: user.email,
            role: user.role
        }, process.env.JWT_SECRET);
        return res.status(200).json({
            success: true,
            token
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
const loginAdmin = async (req, res) => {
    // login with email or username and password
    try{
        const { email, password } = req.body;
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        email: email
                    },
                    {
                        username: email
                    }
                ]
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
        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: 'Wrong password'
            });
        }
        if (user.role.name !== 'admin') {
            return res.status(401).json({
                success: false,
                message: 'You are not authorized'
            });
        }
        const token = jwt.sign({
            id: user.id,
            email: user.email,
            role: user.role
        }, process.env.JWT_SECRET);
        return res.status(200).json({
            success: true,
            token
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const register = async (req, res) => {
    try{
        const { name, email, password, username, tanggal_lahir, roleId} = req.body;
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
                username,
                tanggal_lahir,
                roleId: parseInt(roleId)
            },
        });
        return res.status(201).json({
            success: true,
            user
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    login,
    register,
    loginAdmin
}