const { log } = require("console");
const NftModel = require("../model/nft.model");
const fs = require("fs");
const getAllNft = async () => {
    var nft, total;
    try {
        nft = await NftModel.find({});
        total = await NftModel.find({}).estimatedDocumentCount();
        return { nfts: nft, total: total };
    } catch (error) {
        throw new Error(error);
    }
};

const deleteNft = async (NftAddress) => {
    try {
        nft = await NftModel.findOne({ webAddress: NftAddress });
        if (nft == null) {
            throw new Error("NFT does not exists");
        }
        console.log("nft", nft);
        const res = await NftModel.deleteOne({ webAddress: NftAddress });
        console.log("res----", res);
        
    } catch (error) {
        throw new Error(error);
    }
};

const checkNFT = async (data) => {
    try {
        // load supported nft
        const rawdata = fs.readFileSync(
            "./src/model/resource/supported_nft.json"
        );
        const suppotred = JSON.parse(rawdata.toString());
        const lowerAddress = data.webAddress.toLowerCase();
        const found = suppotred.collections.find(
            (element) =>
                element.blockchain === "Ethereum" &&
                element.contractAddress === lowerAddress
        );
        if (!found) {
            throw new Error("Not in supported NFT")
        }
        return "found in supported NFT"
    } catch (error) {
        throw new Error(error);
    }
}

const addNewNft = async (data) => {
    try {
        // load supported nft
        const rawdata = fs.readFileSync(
            "./src/model/resource/supported_nft.json"
        );
        const suppotred = JSON.parse(rawdata.toString());
        const lowerAddress = data.webAddress.toLowerCase();
        const found = suppotred.collections.find(
            (element) =>
                element.blockchain === "Ethereum" &&
                element.contractAddress === lowerAddress
        );
        if (!found) {
            throw new Error("Not in supported NFT")
        }
        const newNft = new NftModel(data);
        return await newNft.save();
    } catch (error) {
        throw new Error(error);
    }
};

const updateNft = async (data) => {
    try {
        nft = await NftModel.findOne({ webAddress: data.NftAddress });
        nft.price = data.price;
        await nft.save();
    } catch (error) {
        throw new Error(error);
    }
};
const getlistSupportedNft = () => {
    try {
        const rawdata = fs.readFileSync(
            "./src/model/resource/supported_nft.json"
        );
        return rawdata;
    } catch (err) {
        console.error(err);
    }
};
module.exports = {
    getAllNft,
    deleteNft,
    addNewNft,
    updateNft,
    getlistSupportedNft,
    checkNFT
};
