import bcrypt from "bcrypt";
import prisma from "../core/prisma.js";
import serverCodes from "../core/codes.js";
import messageTemplate from "../core/messages.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const {
        username,
        email,
        password,
        type,
        branchId
    } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                branchId,
                username,
                email,
                password: hashedPassword,
                type
            }
        });
    
        res.status(serverCodes.created).json({message: 'User' + messageTemplate[serverCodes.created]});
    } catch (error) {
        res.status(serverCodes.error).json({message: messageTemplate[serverCodes.error] + 'create user!'});
        console.log(error);
    }
    
}
export const login = async (req, res) => {
    const {username, password} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.findUnique({
            where:{OR: [{username}, {email}]}
        });

        if (!user) return res.status(serverCodes.notAllowed).json({message: messageTemplate[serverCodes.notAllowed]});

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) return res.status(serverCodes.notAllowed).json({message: messageTemplate[serverCodes.notAllowed]});


        const maxAge = 1000 * 60 * 60 * 24 * 7;
        const token = jwt.sign(
            {
                id: user.id,
                type: user.type
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: maxAge
            }
        );

        //res.setHeader("Set-Cookie", "test=" + "myValue").json("success");
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.PRODUCTION,
            maxAge
        }).status(serverCodes.success).json({message: 'Login' + messageTemplate[serverCodes.success]});
    } catch (error) {
        res.status(serverCodes.error).json({message: messageTemplate[serverCodes.error] + 'login!'});
        console.log(error);
    }
}
export const logout = (req, res) => {
    res.clearCookie("token").status(serverCodes.success).json({message: 'Logout' + messageTemplate[serverCodes.success]});
}