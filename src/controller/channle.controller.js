const ChannelService = require("../service/channel.service");

const getAllChannel = async (req, res) => {
    try {
        const { channels: a, total: b } = await ChannelService.getAllChannel();
        res.status(200).send({ channle: a, total: b });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
module.exports = {
    getAllChannel,
};
