const OfferModel = require("../model/offer.model");
const AccountService = require("./account.service")
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

module.exports = {
    getAllOffer,
    addNewOffer,
    getSingleOffer,
};
