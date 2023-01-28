const ReceiptService = require("../service/receipt.service");

const getAllReceipt = async (req, res) => {
   try {
      const receipts = await ReceiptService.getAllReceipt();
      res.status(200).send(receipts);
   } catch (error) {
      res.status(500).send(error);
   }
};

const addNewReceipt = async (req, res) => {
   try {
      const data = req.body;
      const receipt = await ReceiptService.addNewReceipt(data);
      res.status(201).send(receipt);
   } catch (error) {
      console.log({error});
      res.send("Invalid message");
   }
};

const getSingleReceipt = async (req, res) => {
    
}

module.exports = {
   getAllReceipt,
   addNewReceipt,
};
