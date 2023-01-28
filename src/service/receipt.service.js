const ReceiptModel = require("../model/reciept.model");

const getAllReceipt = async () => {
   return await ReceiptModel.find({});
};

const addNewReceipt = async (data) => {
   try {
      const newOffer = new ReceiptModel(data);
      return await newOffer.save();
   } catch (error) {
      throw new Error(error);
   }
};

const getSingleReceipt = async (_receiptNumber) => {
   const offer = await ReceiptModel.findOne({ receiptNumber: _receiptNumber });
   return offer;
};

const deleteSingleReceipt = async (_receiptNumber) => {
   try {
      const receipt = await ReceiptModel.findOne({
         receiptNumber: _receiptNumber,
      });
      receipt.delete();
      return receipt;
   } catch (error) {
      console.log(error);
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
