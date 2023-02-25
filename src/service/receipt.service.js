const ReceiptModel = require("../model/reciept.model");
const AccountService = require("./account.service");

const getAllReceipt = async (pageSize, page) => {
    try {
        if (pageSize < 0) {
            pageSize = 10;
        }
        if (page < 1) {
            page = 1;
        }
        receipts = await ReceiptModel.find({})
            .populate("offerPath")
            .populate("nftPath")
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            const web = []
        for (let i = 0; i < receipts.length; i++) {
            const webAddress = receipts[i].nftPath.webAddress
            const element = {webAddress: webAddress};
            web.push(element)
        }
        total = await ReceiptModel.find({}).estimatedDocumentCount();
        return { reciepts: receipts, total: total, webAddress: web };
    } catch (error) {
        throw new Error(error);
    }
};

const addNewReceipt = async (data) => {
    try {
        const newReceipt = new ReceiptModel(data);
        return await newReceipt.save();
    } catch (error) {
        throw new Error(error);
    }
};

const getSingleReceipt = async (_receiptNumber) => {
    try {
        const receipt = await ReceiptModel.findOne({
            receiptNumber: _receiptNumber,
        }).populate("offerPath").populate("nftPath");
        if (receipt == null) {
            throw new Error("Receipt does not exists");
        }
        return { receipt, offers: receipt.offerPath };
    } catch (error) {
        throw new Error(error);
    }
};

const deleteSingleReceipt = async (_receiptNumber) => {
    try {
        const receipt = await ReceiptModel.findOne({
            receiptNumber: _receiptNumber,
        });
        if (receipt == null) {
            throw new Error("Receipt does not exists");
        }
        receipt.delete();
        return receipt;
    } catch (error) {
        throw new Error(error);
    }
};

const updateReceipt = async (data) => {
    try {
    } catch (error) {}
};

module.exports = {
    getAllReceipt,
    addNewReceipt,
    getSingleReceipt,
    deleteSingleReceipt,
    updateReceipt,
};
