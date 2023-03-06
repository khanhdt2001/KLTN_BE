const mongoose = require("mongoose");
var validator = require("validator");

const nftSchema = mongoose.Schema({
    webAddress: {
        type: String,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEthereumAddress(value)) {
                throw new Error("Invalid Address");
            }
        },
    },
})

const Nft = mongoose.model("NFT", nftSchema)
module.exports = Nft