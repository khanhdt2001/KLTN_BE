const OfferModel = require("../model/offer.model");
const AccountService = require("./account.service");
const getAllOffer = async (pageSize, page) => {
    try {
        if (pageSize < 0) {
            pageSize = 10;
        }
        if (page < 1) {
            page = 1;
        }
        offers = await OfferModel.find({})
            .limit(pageSize)
            .skip(pageSize * (page - 1));
        total = await OfferModel.find({}).estimatedDocumentCount();
        return { offers: offers, total: total };
    } catch (error) {
        throw new Error(error);
    }
};
const getMyOffer = async (pageSize, page, myAddress) => {
    try {
        if (pageSize < 0) {
            pageSize = 10;
        }
        if (page < 1) {
            page = 1;
        }
        offers = await OfferModel.find({ lendor: myAddress })
            .populate("receiptPath")
            .limit(pageSize)
            .skip(pageSize * (page - 1));
        const receipt = [];
        for (let i = 0; i < offers.length; i++) {
            const receiptData = offers[i].receiptPath;
            const elementReceipt = { receipt: receiptData };
            receipt.push(elementReceipt);
        }
        total = await OfferModel.find({
            lendor: myAddress,
        }).estimatedDocumentCount();
        return { offers: offers, total: total, receipt: receipt };
    } catch (error) {
        throw new Error(error);
    }
};
const addNewOffer = async (data) => {
    try {
        // await AccountService.getAccoutnDetail(data.lendor)
        const newOffer = new OfferModel(data);
        return await newOffer.save();
    } catch (error) {
        throw new Error(error);
    }
};

const getSingleOffer = async (_offerNumber) => {
    try {
        const offer = await OfferModel.findOne({
            offerNumber: _offerNumber,
        }).populate("receiptPath");
        if (offer == null) {
            throw new Error("Offer does not exist");
        }
        return { offer, receipt: offer.receiptPath };
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

const updateOffer = async (_offerNumber, requestNumber) => {
    try {
        let offer = await OfferModel.findOne({ offerNumber: _offerNumber, receiptNumber :  requestNumber});
        offer.checked = true;
        await offer.save()
        return offer;
    } catch (error) {
        throw new Error(error);
    }
};
module.exports = {
    getAllOffer,
    getMyOffer,
    addNewOffer,
    getSingleOffer,
    updateOffer,
};
