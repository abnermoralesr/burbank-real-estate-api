import serverCodes from "#core/codes.js";
import messageTemplate from "#core/messages.js";
import prisma from "#core/prisma.js";

export const getBranches = async (req, res) => {
    try {
        const branches = await prisma.branch.findMany();
        res.status(serverCodes.success).json(branches);
    } catch (error) {
        console.log(error);
        res.status(serverCodes.error).json({
            message: messageTemplate[serverCodes.error] + "get branches"
        });
    }
}

export const getBranch = async (req, res) => {
    const id = req.params.id;

    try {
        const branch = await prisma.branch.findUnique({
            where: { id }
        });
        res.status(serverCodes.success).json(branch);
    } catch (error) {
        console.log(error);
        res.status(serverCodes.error).json({
            message: messageTemplate[serverCodes.error] + "get branch"
        });
    }
}

export const createBranch = async (req, res) => {
    const body = req.body;

    try {
        const newBranch = await prisma.branch.create(body);
        res.status(serverCodes.success).json(newBranch);
    } catch (error) {
        console.log(error);
        res.status(serverCodes.error).json({
            message: messageTemplate[serverCodes.error] + "create branch"
        });
    }
}

export const updateBranch = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    try {
        const updatedBranch = await prisma.branch.update({
            where: { id },
            data: body
        });
        res.status(serverCodes.success).json(updatedBranch);
    } catch (error) {
        console.log(error);
        res.status(serverCodes.error).json({
            message: messageTemplate[serverCodes.error] + "update branch"
        });
    }
}

export const deleteBranch = async (req, res) => {
    const id = req.params.id;
    
    try {
        await prisma.branch.delete({
            where: {id}
        });
        res.status(serverCodes.success).json({message: "Branch deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(serverCodes.error).json({
            message: messageTemplate[serverCodes.error] + "delete branch"
        });
    }
}
