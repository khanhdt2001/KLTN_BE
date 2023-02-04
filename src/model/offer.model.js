const mongoose = require("mongoose");
var validator = require("validator");

const offerSchema = mongoose.Schema({
    receiptNumber: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) {
                throw new Error("Receipt number must be positive number");
            }
        },
    },
    offerNumber: {
        type: Number,
        required: true,
        unique: true,
        validate(value) {
            if (value < 0) {
                throw new Error("Offer number must be positive number");
            }
        },
    },
    offerTokenAmount: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) {
                throw new Error("Token Amount must be positive number");
            }
        },
    },
    offerTokenRate: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) {
                throw new Error("Token rate must be positive number");
            }
        },
    },
    offerAmountOfTime: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) {
                throw new Error("Amount of time must be positive number");
            }
        },
    },
    lendor: {
        type: String,
        lowercase: true,
        required: true,
        validate(value) {
            if (!validator.isEthereumAddress(value)) {
                throw new Error("Invalid Address");
            }
        },
    },
});

offerSchema.virtual("receiptPath", {
    ref: "Receipt",
    localField: "receiptNumber",
    foreignField: "receiptNumber",
    justOne: true,
});

const Offer = mongoose.model("Offer", offerSchema);
module.exports = Offer;
