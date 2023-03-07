const express = require("express");
const router = express.Router();
const ReceiptController = require("../controller/receipt.controller");

router.get("/receipt/:pageSize/:page", ReceiptController.getAllReceipt);
router.get("/receipt/:pageSize/:page/:myAddress", ReceiptController.getMyReceipt);
router.get("/receipt/:receiptNumber", ReceiptController.getSingleReceipt);
router.post("/receipt", ReceiptController.addNewReceipt);
router.delete("/receipt/:receiptNumber", ReceiptController.deleteReceipt);
module.exports = router;
