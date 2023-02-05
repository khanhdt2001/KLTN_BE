const AccountService = require("../service/account.service");

const getAllAccount = async (req, res) => {
    try {
        const { pageSize, page } = req.body;
        const { accounts: a, total: b } = await AccountService.getAllAccount(
            pageSize,
            page
        );
        res.status(200).send({ accounts: accounts, total: total });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getAccountDetail = async (req, res) => {
    try {
        const { address } = req.params;
        const account = await AccountService.getAccoutnDetail(address);
        res.status(200).send(account);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const addnewAccount = async (req, res) => {
    try {
        const data = req.body;
        const account = await AccountService.addNewAccount(data);
        res.status(201).send(account);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    getAllAccount,
    getAccountDetail,
    addnewAccount
};