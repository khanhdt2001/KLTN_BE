const express = require("express");
const router = express.Router()
const NftController = require("../controller/nft.controller");


router.get("/nfts", NftController.getAllNft)
router.delete("/nfts/:nftAddress", NftController.deleteNft)
router.post("/nfts", NftController.checkNFT)
router.get("/nfts/suppotred", NftController.getlistSupportedNft)

module.exports = router;