const express = require("express");
const router = express.Router();

const ChannleController = require("../controller/channle.controller");

router.get("/channels", ChannleController.getAllChannel);

module.exports = router;
