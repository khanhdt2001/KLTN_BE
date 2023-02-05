const jwt = require("jsonwebtoken");
const AccountModel = require("../model/account.model");

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer", "");
        const decode = jwt.verify(token, "secret");
        const account = await AccountModel.findOne({
            _id: decode._id,
            token: token,
        });
        if (account == null) throw new Error();
        req.account = account;
    } catch (error) {
        console.log({ error });
        res.status(401).send("Please authenticate");
    }

    next();
};

module.exports = auth;
