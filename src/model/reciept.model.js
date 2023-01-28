const mongoose = require("mongoose");
var validator = require("validator");

const receiptSchema = mongoose.Schema({
   receiptNumber: {
      type: Number,
      require: true,
      unique: true,
      validate(value) {
         if (value < 0) {
            throw new Error("Receipt number must be positive number");
         }
      },
   },
   vendor: {
      type: String,
      lowercase: true,
      require: true,
      validate(value) {
         if (!validator.isEthereumAddress(value)) {
            throw new Error("Invalid Address");
         }
      },
   },
   lendor: {
      type: String,
      lowercase: true,
      require: true,
      validate(value) {
         if (!validator.isEthereumAddress(value)) {
            throw new Error("Invalid Address");
         }
      },
   },
   NFTAddress: {
      type: String,
      lowercase: true,
      require: true,
      validate(value) {
         if (!validator.isEthereumAddress(value)) {
            throw new Error("Invalid Address");
         }
      },
   },
   tokenId: {
      type: String,
      require: true,
      validate: {
         validator: function (v) {
            return /^[0-9]*$/.test(v);
         },
         message: (props) => `${props.value} is not a valid tokenId number!`,
      },
   },
   tokenAmount: {
      type: Number,
      require: true,
      validate(value) {
         if (value < 0) {
            throw new Error("Token Amount must be positive number");
         }
      },
   },
   paidAmount: {
      type: Number,
      default: 0,
      validate(value) {
         if (value < 0) {
            throw new Error("Paid token Amount must be positive number");
         }
      },
   },
   tokenRate: {
      type: Number,
      require: true,
   },
   amountOfTime: {
      type: Number,
      require: true,
   },
   deadLine: {
      type: Number,
      require: true,
   },
});
const Reciept = mongoose.model("Reciept", receiptSchema);
module.exports = Reciept;
