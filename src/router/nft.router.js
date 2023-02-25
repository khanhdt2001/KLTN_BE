const express = require("express");
const router = express.Router()
const NftController = require("../controller/nft.controller");


router.get("/nfts", NftController.getAllNft)
router.put("/nfts/:nftAddress", NftController.deleteNft)
router.post("/nfts", NftController.addNewNft)

module.exports = router;