const NftModel = require("../model/nft.model");

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
        nft = await NftModel.findOne({ localAddress: NftAddress });
        if (nft == null) {
            throw new Error("NFT does not exists");
        }
        nft.delete();
        return nft;
    } catch (error) {
        throw new Error(error);
    }
};

const addNewNft = async (data) => {
    try {
        const newNft = new NftModel(data);
        return await newNft.save();
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    getAllNft,
    deleteNft,
    addNewNft,
};
