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

const activeOrDeActiveNft = async (NftAddress) => {
    try {
        nft = await NftModel.findOne({localAddress: NftAddress})
        nft.isAble = nft.isAble * -1
        nft.save()
        return nft
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    getAllNft,
    activeOrDeActiveNft
}
