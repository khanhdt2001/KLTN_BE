const NftModel = require("../model/nft.model");

const getAllNft = async (role) => {
    var nft, total;
    try {
        if (role == "ADMIN") {
            nft = await NftModel.find({});
            total = await NftModel.find({}).estimatedDocumentCount();
        } else {
            nft = await NftModel.find({ isAble: true });
            total = await NftModel.find({
                isAble: true,
            }).estimatedDocumentCount();
        }
        return { nfts: nft, total: total };
    } catch (error) {
        throw new Error(error)
    }
};

const deleteNft = async (NftAddress) => {
    try {
        nft = await NftModel.findOne({localAddress: NftAddress})
       if (nft == null) {
        throw new Error("NFT does not exists")
       }
       nft.delete();
       return nft
    } catch (error) {
        throw new Error(error)
    }
}

const addNewNft = async (data) => {
    try {
        const newNft = new NftModel(data)
        return await newNft.save();
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getAllNft,
    deleteNft,
    addNewNft
}
