const express = require("express");
const router = express.Router();
const AccountController = require("../controller/account.controller");

router.get("/account", AccountController.getAllAccount);
router.get("/account/:address", AccountController.getAccountDetail);
router.post("/account", AccountController.addnewAccount);

module.exports = router;
