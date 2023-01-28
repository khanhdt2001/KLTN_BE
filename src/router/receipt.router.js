const express = require("express");
const router = express.Router();
const ReceiptController = require("../controller/receipt.controller");

router.get("/receipt", ReceiptController.getAllReceipt);
router.post("/receipt", ReceiptController.addNewReceipt);

module.exports = router;
