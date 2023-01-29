const express = require("express");
const router = express.Router();
const OfferController = require("../controller/offer.controller");

router.get("/offer", OfferController.getAllOffer);
router.get("/offer/:offerNumber", OfferController.getSingleOffer);
router.post("/offer", OfferController.addNewOffer);

module.exports = router;
