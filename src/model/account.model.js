const mongoose = require("mongoose");
var validator = require("validator");
const accountSchema = mongoose.Schema({
   address: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      validate(value) {
         if (!validator.isEthereumAddress(value)) {
            throw new Error("Invalid Address");
         }
      },
   },
});

accountSchema.virtual("receiptPath", {
   ref: "Receipt",
   localField: "address",
   foreignField: "vendor",
   justOne: false,
});
accountSchema.virtual("offerPath", {
   ref: "Offer",
   localField: "address",
   foreignField: "lendor",
   justOne: false,
});

const Account = mongoose.model("Account", accountSchema);
module.exports = Account;
