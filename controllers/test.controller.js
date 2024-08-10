import serverCodes from "#core/codes.js";

export const shouldBeLoggedIn = async (req, res) => {
    console.log(req.userId);
    res.status(serverCodes.success).json({message: "Loggedin"});
};

export const shouldBeAdmin = async (req, res) => {

    res.status(serverCodes.success).json({message: "Admin"});
};
