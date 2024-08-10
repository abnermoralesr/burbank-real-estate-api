import jwt from "jsonwebtoken";
import serverCodes from "#core/codes.js";
import messageTemplate from "#core/messages.js";
import prisma from "#core/prisma.js";
import adminUsers from "#core/adminTypes.js";

export const canUpdateAdmin = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.status(serverCodes.notAllowed).json({ message: messageTemplate[serverCodes.notAllowed] });

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) return res.status(serverCodes.forbidden).json({ message: messageTemplate[serverCodes.forbidden] });

        let id = req.params.id;
        let admin = false;
        let deleteMethod = req.route.methods['delete'] ?? false;

        req.userId = payload.id;
        req.userType = payload.type;
        req.userBranch = payload.branch;
        req.userStatus = payload.status;
        req.userIsAdmin = payload.isAdmin;
        req.rootUser = payload.rootUser;

        if (payload.isAdmin) {
            try {
                const user = await prisma.user.findUnique({
                    where: { id: payload.id }
                });

                if (!user) {
                    return res.status(serverCodes.forbidden).json({ message: messageTemplate[serverCodes.forbidden] });
                }

                admin = adminUsers.includes(user.type);
            } catch (error) {
                console.log(error);
                return res.status(serverCodes.error).json({ message: messageTemplate[serverCodes.error] });
            }
        }

        if (
            id !== req.params.userId
            && !admin
            || (
                deleteMethod
                && !admin
            )
            || (
                deleteMethod
                && admin
                && id === req.params.userId
            )
        ) {
            return res.status(serverCodes.forbidden).json({
                message: messageTemplate[serverCodes.forbidden]
            });
        }

        next();
    });
}