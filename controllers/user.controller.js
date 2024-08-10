import serverCodes from "#core/codes.js";
import messageTemplate from "#core/messages.js";
import prisma from "#core/prisma.js";
import bcrypt from "bcrypt"

export const createUser = async (req, res) => {
    try {
        res.status(serverCodes.success).json({
            message: messageTemplate[serverCodes.success] + " create user"
        });
    } catch (error) {
        console.log(error);
        res.status(serverCodes.error).json({
            message: messageTemplate[serverCodes.error] + "get users"
        })
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                Branch: true
            }
        });
        
        res.status(serverCodes.success).json(users);
    } catch (error) {
        console.log(error);
        res.status(serverCodes.error).json({
            message: messageTemplate[serverCodes.error] + "get users"
        })
    }
}

export const getUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                Branch: true
            }
        });
        
        res.status(serverCodes.success).json(user);
    } catch (error) {
        console.log(error);
        res.status(serverCodes.error).json({
            message: messageTemplate[serverCodes.error] + "get user"
        })
    }
}

export const updateUser = async (req, res) => {
    const id = req.params.id;
    const { password, avatar, ...inputs } = req.body;

    let updatedPassword = null;

    try {
        if (password) {
            updatedPassword = await bcrypt.hash(password, 10);
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                ...inputs,
                ...(updatedPassword && { password: updatedPassword }),
                ...(avatar && { avatar }),
            }
        });

        const {
            password: userPassword,
            branchId,
            type,
            status,
            ...rest
        } = updatedUser;

        res.status(serverCodes.success).json(rest);
    } catch (error) {
        console.log(error);
        res.status(serverCodes.error).json({
            message: messageTemplate[serverCodes.error] + " update user"
        })
    }
}

export const deleteUser = async (req, res) => {
    let id = req.params.id;

    try {
        await prisma.user.delete({
            where: {id}
        });
    } catch (error) {
        console.log(error);
        res.status(serverCodes.error).json({
            message: messageTemplate[serverCodes.error] + "delete user"
        })
    }
}