const mongoose = require("mongoose");
var validator = require("validator");

const offerSchema = mongoose.Schema({
  vendor: {
    type: String,
    lowercase: true,
    trim: true,
    require: true,
    validator(value) {
      if (!validator.NFTAddress(value)) {
        throw new Error("Invalid Address");
      }
    },
  },
  lendor: {
    type: String,
    lowercase: true,
    trim: true,
    require: true,
    validator(value) {
      if (!validator.NFTAddress(value)) {
        throw new Error("Invalid Address");
      }
    },
  },
  NFTAddress: {
    type: String,
    lowercase: true,
    trim: true,
    require: true,
    validator(value) {
      if (!validator.NFTAddress(value)) {
        throw new Error("Invalid Address");
      }
    },
  },
  tokenId: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[0-9]*$/.test(v);
      },
      message: (props) => `${props.value} is not a valid tokenId number!`,
    },
  },
  token
});
