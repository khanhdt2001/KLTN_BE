const ReceiptService = require("../service/receipt.service");

const getAllReceipt = async (req, res) => {
    try {
        const { pageSize, page } = req.params;
        const { receipts: a, total: b, offer: d } = await ReceiptService.getAllReceipt(
            pageSize,
            page
        );
        res.status(200).send({ receipts: receipts, total: total, offer : d });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const addNewReceipt = async (req, res) => {
    try {
        const data = req.body;
        const receipt = await ReceiptService.addNewReceipt(data);
        res.status(201).send(receipt);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getSingleReceipt = async (req, res) => {
    try {
        const { receiptNumber } = req.params;
        const receipt = await ReceiptService.getSingleReceipt(receiptNumber);
        res.status(200).send(receipt);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteReceipt = async (req, res) => {
    try {
        const { receiptNumber } = req.params;
        const receipt = await ReceiptService.deleteSingleReceipt(receiptNumber);
        res.status(200).send(receipt);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getAllReceipt,
    addNewReceipt,
    getSingleReceipt,
    deleteReceipt
};
