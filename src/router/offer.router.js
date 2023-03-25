const express = require("express");
const router = express.Router();
const OfferController = require("../controller/offer.controller");

router.get("/offer", OfferController.getAllOffer);
router.get("/offer/:offerNumber", OfferController.getSingleOffer);
router.post("/offer", OfferController.addNewOffer);
router.get("/offer/:pageSize/:page/:myAddress", OfferController.getMyOffer);
module.exports = router;
