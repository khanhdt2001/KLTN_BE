const express = require("express");
const router = express.Router()
const NftController = require("../controller/nft.controller");


router.get("/nfts", NftController.getAllNft)
router.put("/nfts/:nftAddress", NftController.activeOrDeActiveNft)

module.exports = router;