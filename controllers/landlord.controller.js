import serverCodes from "#core/codes.js";
import messageTemplate from "#core/messages.js";
import prisma from "#core/prisma.js";

export const getLandlords = async (req, res) => {
    try {
        const landlords = await prisma.landlord.findMany({
            include: {
    _count: {
      select: { Property: true }
    }
  }
        });
        res.status(serverCodes.success).json(landlords);
    } catch (error) {
        console.log(error);
        res.status(serverCodes.error).json({
            message: messageTemplate[serverCodes.error] + "get landlords"
        })
    }
}

export const getLandlord = async (req, res) => {
    const id = req.params.id;

    try {
        const landlord = await prisma.landlord.findUnique({
            where: { id }
        });
        res.status(serverCodes.success).json(landlord);
    } catch (error) {
        console.log(error);
        res.status(serverCodes.error).json({
            message: messageTemplate[serverCodes.error] + "get landlord"
        })
    }
}

export const createLandlord = async (req, res) => {
    const body = req.body;

    try {
        const newLandlord = await prisma.landlord.create(body);
        res.status(serverCodes.success).json(newLandlord);
    } catch (error) {
        console.log(error);
        res.status(serverCodes.error).json({
            message: messageTemplate[serverCodes.error] + "create landlord"
        })
    }
}

export const updateLandlord = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    try {
        const updatedLandlord = await prisma.landlord.update({
            where: { id },
            data: body
        });
        res.status(serverCodes.success).json(updatedLandlord);
    } catch (error) {
        console.log(error);
        res.status(serverCodes.error).json({
            message: messageTemplate[serverCodes.error] + "update landlord"
        })
    }
}

export const deleteLandlord = async (req, res) => {
    const id = req.params.id;
    
    try {
        await prisma.landlord.delete({
            where: {id}
        });
        res.status(serverCodes.success).json({message: "Landlord deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(serverCodes.error).json({
            message: messageTemplate[serverCodes.error] + "delete landlord"
        })
    }
}
