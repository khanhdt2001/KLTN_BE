const AccountModel = require("../model/account.model");

const getAccoutnDetail = async (address) => {
    try {
        const account = await AccountModel.findOne({ address: address })
            .populate("receiptPath")
            .populate("offerPath");
        if (account == nul) {
            throw new Error("Account does not exist");
        }
        return {
            account: account,
            offers: account.offerPath,
            receipts: account.receiptPath,
        };
    } catch (error) {
        throw new Error(error);
    }
};

const addNewAccount = async (address) => {
    try {
        const newAccount = new AccountModel(address)
        return await newAccount.save();
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    getAccoutnDetail,
    addNewAccount
}