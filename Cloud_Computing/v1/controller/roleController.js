const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllRole = async (req, res) => {
    try {
        const roles = await prisma.role.findMany();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json(error);
    }
    }

const getRoleById = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await prisma.role.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json(error);
    }
}

const createRole = async (req, res) => {
    const { name } = req.body;
    try {
        const role = await prisma.role.create({
            data: {
                name: name,
            },
        });
        res.status(201).json(role);
    } catch (error) {
        res.status(500).json(error);
    }
}

const updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const role = await prisma.role.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name
            }
        });
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.role.delete({
            where: {
                id: parseInt(id)
            }
        });
        res.status(204).json('Role deleted successfully');
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports = {
    getAllRole,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
}
