require("dotenv").config();
const jwt = require("jsonwebtoken");
const AccountModel = require("../model/account.model");


const reuiredPath = [
    
]

const auth = async (req, res, next) => {
    try {
        if (req.path != "/connect-wallet") {
            const token = req
                .header("Authorization")
                .replace("Bearer", "")
                .replace(" ", "");
            const decode = jwt.verify(token, process.env.SECRET_KEY);
            // if (decode._expireAt < Date.now()) {
            //     throw new Error("Invalid token");
            // }
            const account = await AccountModel.findOne({
                _id: decode._id,
                token: token,
            });
            if (account == null) throw new Error();
            req.account = account;
        }
    } catch (error) {
        res.status(401).send("Please authenticate");
        return;
    }

    next();
};

module.exports = auth;
