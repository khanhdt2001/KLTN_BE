const { watch } = require("../model/channel.model");
const NftService = require("../service/nft.service");

const getAllNft = async (req, res) => {
    try {
        const { nfts: a, total: b } = await NftService.getAllNft();
        res.status(200).send({ nfts: a, total: b });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteNft = async (req, res) => {
    try {
        const { nftAddress } = req.body;
        const nft = await NftService.deleteNft(nftAddress);
        res.status(200).send(nft);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const addNewNft = async (req, res) => {
    try {
        const data = req.body
        const nft = await NftService.addNewNft(data)
        res.status(201).send(nft)
    } catch (error) {
        res.status(400).send(error.message)
    }
}
const getlistSupportedNft = async (req, res) => {
    try {
        const data = NftService.getlistSupportedNft()
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error.message)
    }
}
module.exports = {
    getAllNft,
    deleteNft,
    addNewNft,
    getlistSupportedNft
}