const ReceiptModel = require("../model/reciept.model");

const getAllReceipt = async (pageSize, page) => {
   try {
      if (pageSize < 10 || pageSize > 20) {
         pageSize = 10;
      }
      if (page < 1) {
         page = 1;
      }
      receipts = await ReceiptModel.find({})
         .limit(pageSize)
         .skip(pageSize * (page - 1));
      total = await ReceiptModel.find({}).estimatedDocumentCount();
      return { reciepts: receipts, total: total };
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
      }).populate('offerPath');

      if (receipt == null) {
         throw new Error("Receipt does not exists");
      }
      return {receipt, offers: receipt.offerPath};
   } catch (error) {
      throw new Error(error);
   }
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
