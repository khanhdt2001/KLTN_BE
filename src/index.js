const express = require("express");
const ReceiptRouter = require("./router/receipt.router");
const OfferRouter = require("./router/offer.router");
require("dotenv").config();

const cors = require("cors");
require("./db/mongoose");

const app = express();

const PORT = process.env.SERVER_PORT;

app.use(express.json());
app.use(cors());
app.use(ReceiptRouter);
app.use(OfferRouter);

app.listen(PORT, () => {
   console.log(`Server is running on port: ${PORT}`);
});
