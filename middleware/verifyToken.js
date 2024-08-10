import jwt from "jsonwebtoken";
import serverCodes from "#core/codes.js";
import messageTemplate from "#core/messages.js";
import prisma from "#core/prisma.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.status(serverCodes.notAllowed).json({ message: messageTemplate[serverCodes.notAllowed] });

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) return res.status(serverCodes.forbidden).json({ message: messageTemplate[serverCodes.forbidden] });

        req.userId = payload.id;
        req.userType = payload.type;
        req.userBranch = payload.branch;
        req.userStatus = payload.status;
        req.userIsAdmin = payload.isAdmin;
        req.rootUser = payload.rootUser;

        next();
    });
}