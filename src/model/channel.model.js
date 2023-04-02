const mongoose = require("mongoose");

const channelSchema = mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        unique: true,
    },
    access: [String],
});

const Channel = mongoose.model("channel", channelSchema);
module.exports = Channel;
