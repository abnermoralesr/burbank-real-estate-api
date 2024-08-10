import prisma from "#core/prisma.js";
import adminUsers from "#core/adminTypes.js";

export const abortUpdate = async (req, userId) => {
    let abort = true;

    if (
        req.params.id !== userId
        && !req.userIsAdmin
    ) {
        return true;
    }

    if (req.userIsAdmin) {
        try {
            const user = await prisma.user.findUnique({
                where: {id: userId}
            });

            if (!user) {
                return true;
            }

            abort = !adminUsers.includes(user.type);
        } catch (error) {
            console.log(error);
            return true;
        }
    }

    return abort;
}