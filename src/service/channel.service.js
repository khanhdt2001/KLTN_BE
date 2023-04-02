const ChannelModel = require("../model/channel.model");

const createChannel = async (name) => {
    try {
        const newChannel = new ChannelModel({ name: name });
        return newChannel.save();
    } catch (error) {
        throw new Error(error);
    }
};

const getAllChannel = async () => {
    var channel, total;
    try {
        channel = await ChannelModel.find({});
        total = await ChannelModel.find({}).estimatedDocumentCount();
        return { channels: channel, total: total };
    } catch (error) {
        throw new Error(error);
    }
};

const addAccess = async (name, address1, address2) => {
    try {
        let channel = await ChannelModel.findOne({ name: name });
        channel.access = [address1, address2];
        await channel.save();
    } catch (error) {
        throw new Error(error);
    }
};
module.exports = { createChannel, getAllChannel, addAccess };
