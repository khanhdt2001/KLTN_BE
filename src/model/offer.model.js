const mongoose = require("mongoose");
var validator = require("validator");

const offerSchema = mongoose.Schema({
   //    receiptNumber: {
   receipt: {
      type: Number,
      require: true,
      validate(value) {
         if (value < 0) {
            throw new Error("Receipt number must be positive number");
         }
      },
   },
   offerNumber: {
      type: Number,
      require: true,
      unique: true,
      validate(value) {
         if (value < 0) {
            throw new Error("Offer number must be positive number");
         }
      },
   },
   offerTokenAmount: {
      type: Number,
      require: true,
      validate(value) {
         if (value < 0) {
            throw new Error("Token Amount must be positive number");
         }
      },
   },
   offerTokenRate: {
      type: Number,
      require: true,
      validate(value) {
         if (value < 0) {
            throw new Error("Token rate must be positive number");
         }
      },
   },
   offerAmountOfTime: {
      type: Number,
      require: true,
      validate(value) {
         if (value < 0) {
            throw new Error("Amount of time must be positive number");
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
});

offerSchema.virtual("receiptPath", {
   ref: "Receipt",
   localField: "receipt",
   foreignField: "receiptNumber",
   justOne: true,
});

const Offer = mongoose.model("Offers", offerSchema);
module.exports = Offer;
