const mongoose = require("mongoose");
var validator = require("validator");
const OfferModel = require("./offer.model");
const receiptSchema = mongoose.Schema({
    receiptNumber: {
        type: Number,
        required: true,
        unique: true,
        validate(value) {
            if (value < 0) {
                throw new Error("Receipt number must be positive number");
            }
        },
    },
    vendor: {
        type: String,
        lowercase: true,
        required: true,
        validate(value) {
            if (!validator.isEthereumAddress(value)) {
                throw new Error("Invalid Address");
            }
        },
    },
    lendor: {
        type: String,
        lowercase: true,
        default: "0x0000000000000000000000000000000000000000",
        validate(value) {
            if (!validator.isEthereumAddress(value)) {
                throw new Error("Invalid Address");
            }
        },
    },
    NFTAddress: {
        type: String,
        lowercase: true,
        required: true,
        validate(value) {
            if (!validator.isEthereumAddress(value)) {
                throw new Error("Invalid Address");
            }
        },
    },
    tokenId: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[0-9]*$/.test(v);
            },
            message: (props) => `${props.value} is not a valid tokenId number!`,
        },
    },
    tokenAmount: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("Token Amount must be positive number");
            }
        },
    },
    paidAmount: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("Paid token Amount must be positive number");
            }
        },
    },
    tokenRate: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("Token rate must be positive number");
            }
        },
    },
    amountOfTime: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("Amount of time must be positive number");
            }
        },
    },
    deadLine: {
        type: Number,
        default: 0,
    },
});

receiptSchema.pre("remove", async function (next) {
    const receipt = this;
    await OfferModel.deleteMany({ receiptNumber: receipt.receiptNumber });
    next();
});

receiptSchema.virtual("offerPath", {
    ref: "Offer",
    localField: "receiptNumber",
    foreignField: "receiptNumber",
    justOne: false,
});

const Reciept = mongoose.model("Receipt", receiptSchema);
module.exports = Reciept;
