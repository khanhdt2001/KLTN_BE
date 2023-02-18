require("dotenv").config();
const mongoose = require("mongoose");
var validator = require("validator");
const jwt = require("jsonwebtoken");

const accountSchema = mongoose.Schema({
    address: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        validate(value) {
            if (!validator.isEthereumAddress(value)) {
                throw new Error("Invalid Address");
            }
        },
    },
    role: {
        type: String,
        default: "USER",
    },
    token: {
        type: String,
        default: ""
    },
});

accountSchema.set("toJSON", {
    transform: function (doc, ret, opt) {
        delete ret["role"];
        delete ret["token"];
        return ret;
    },
});

accountSchema.methods.genAuthToken = async function () {
    const account = this;
    let expireAt = Date.now() + 900000;
    const token = jwt.sign({ _id: account._id, _role: account.role, _expireAt: expireAt},process.env.SECRET_KEY);
    account.token = token;
    await account.save();
    return token;
};

accountSchema.virtual("receiptPath", {
    ref: "Receipt",
    localField: "address",
    foreignField: "vendor",
    justOne: false,
});
accountSchema.virtual("offerPath", {
    ref: "Offer",
    localField: "address",
    foreignField: "lendor",
    justOne: false,
});

const Account = mongoose.model("Account", accountSchema);
module.exports = Account;
