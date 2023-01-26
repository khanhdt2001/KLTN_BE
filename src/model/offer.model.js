const mongoose = require("mongoose");

const offerSchema = mongoose.Schema({
    vendor: {
        type : String,
        require: true,
        
    }
})