const express = require("express");
const ReceiptRouter = require("./router/receipt.router");
const OfferRouter = require("./router/offer.router");
const AccountRouter = require("./router/account.router");
const NftRouter = require("./router/nft.router");
const auth = require("./middleware/authen");
require("dotenv").config();

const cors = require("cors");
require("./db/mongoose");
require("./queue/queue")
const app = express();

const PORT = process.env.SERVER_PORT;

app.use(express.json());
app.use(cors());
// app.use(auth);
app.use(ReceiptRouter);
app.use(OfferRouter);
app.use(AccountRouter);
app.use(NftRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
