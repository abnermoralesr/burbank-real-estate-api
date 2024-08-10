import serverCodes from "#core/codes.js";
import messageTemplate from "#core/messages.js";
import prisma from "#core/prisma.js";

const include = {
    User: {
                    select: {
                        username: true,
                        avatar: true,
                        email: true
                    }
                },
                UserAssigned: {
                    select: {
                        username: true,
                        avatar: true,
                        email: true
                    }
    },
                PropertyDetail: true,
}

export const getProperties = async (req, res) => {
    const query = req.query;
    const rent = (query.search !== undefined && query.search !== '') ? query.search === 'rent' : undefined;


    try {
        const properties = await prisma.property.findMany({
            where: {
                city: query.city || undefined,
                rent,
                type: query.type || undefined,
                price: {
                    gte: parseFloat(query.minPrice) || 0,
                    lte: parseFloat(query.maxPrice) || 1000000000,
                }
            },
            include
        });
        res.status(serverCodes.success).json(properties);
    } catch (error) {
        console.log(error);
        res.status(serverCodes.error).json({
            message: messageTemplate[serverCodes.error] + "get properties"
        })
    }
}

export const getProperty = async (req, res) => {
    const id = req.params.id;

    try {
        const property = await prisma.property.findUnique({
            where: { id },
            include
        });
        res.status(serverCodes.success).json(property);
    } catch (error) {
        console.log(error);
        res.status(serverCodes.error).json({
            message: messageTemplate[serverCodes.error] + "get property"
        })
    }
}

export const createProperty = async (req, res) => {
    const body = req.body;
    const tokenUserId = req.userId;

    try {
        const newPost = await prisma.property.create({
            data: {
                ...body.propertyData,
                userId: tokenUserId,
                PropertyDetail: {
                    create: body.propertyDetail
                }
            }
        });
        res.status(serverCodes.success).json(newPost);
    } catch (error) {
        console.log(error);
        res.status(serverCodes.error).json({
            message: messageTemplate[serverCodes.error] + "create property"
        })
    }
}

export const updateProperty = async (req, res) => {
    try {
        res.status(serverCodes.success).json(); //TODO
    } catch (error) {
        console.log(error);
        res.status(serverCodes.error).json({
            message: messageTemplate[serverCodes.error] + "update property"
        })
    }
}

export const deleteProperty = async (req, res) => {
    const id = req.params.id;
    
    try {
        await prisma.property.delete({
            where: {id}
        });
        res.status(serverCodes.success).json({message: "Property deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(serverCodes.error).json({
            message: messageTemplate[serverCodes.error] + "delete property"
        })
    }
}

function excludeId(record) {
  if (Array.isArray(record)) {
    return record.map(({ id, ...rest }) => rest);
  } else if (record) {
    const { id, ...rest } = record;
    return rest;
  }
  return null;
}
