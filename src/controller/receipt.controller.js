const ReceiptService = require("../service/receipt.service");

const getAllReceipt = async (req, res) => {
   try {
      const { pageSize, page } = req.body;
      const { receipts: a, total: b } = await ReceiptService.getAllReceipt(
         pageSize,
         page
      );
      res.status(200).send({ receipts: receipts, total: total });
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

module.exports = {
   getAllReceipt,
   addNewReceipt,
   getSingleReceipt,
};
