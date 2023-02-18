const AccountModel = require("../model/account.model");
const Web3Token = require('web3-token');

const connectWallet = async (web3Token) => {
    try {
        const { address, body } = await Web3Token.verify(web3Token);
        const account = await AccountModel.findOne({ address: address });
        const jwt = await account.genAuthToken();
        return jwt;
    } catch (error) {
        throw new Error(error)
    }
};

const getAllAccount = async (pageSize, page) => {
    try {
        if (pageSize < 0) {
            pageSize = 10;
        }
        if (page < 1) {
            page = 1;
        }
        accounts = await AccountModel.find({})
            .limit(pageSize)
            .skip(pageSize * (page - 1));
        total = await AccountModel.find({}).estimatedDocumentCount();
        return { accounts: accounts, toatl: total };
    } catch (error) {
        throw new Error(error);
    }
};

const getAccoutnDetail = async (address) => {
    try {
        const account = await AccountModel.findOne({ address: address })
            .populate("receiptPath")
            .populate("offerPath");
        if (account == null) {
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
        const newAccount = new AccountModel(address);
        return await newAccount.save();
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    connectWallet,
    getAllAccount,
    getAccoutnDetail,
    addNewAccount,
};
