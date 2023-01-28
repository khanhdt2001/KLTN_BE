const OfferModel = require("../model/offer.model");

const getAllOffer = async () => {
   return await OfferModel.find({});
};

const addNewOffer = async (data) => {
   const newOffer = new OfferModel(data);
   return await newOffer.save();
};

const getSingleOffer = async (offerId) => {
    const offer = await OfferModel.findOne({})
}
