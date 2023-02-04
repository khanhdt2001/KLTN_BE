const OfferService = require("../service/offer.service");

const getAllOffer = async (req, res) => {
   try {
      const { pageSize, page } = req.body;
      const { offers: a, total: b } = await OfferService.getAllOffer(
         pageSize,
         page
      );
      res.status(200).send({ offers: offers, total: total });
   } catch (error) {
      res.status(500).send(error.message);
   }
};

const addNewOffer = async (req, res) => {
    try {
        const data = req.body;
        const offer = await OfferService.addNewOffer(data);
        res.status(201).send(offer);
     } catch (error) {
        res.status(400).send(error.message);
     }
}
const getSingleOffer = async (req, res) => {
    try {
        const { offerNumber } = req.params;
        const offer = await OfferService.getSingleOffer(offerNumber);
        res.status(200).send(offer);
     } catch (error) {
        res.status(500).send(error.message);
     }
}
module.exports = {
    getAllOffer,
    addNewOffer,
    getSingleOffer
}