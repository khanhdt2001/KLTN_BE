const contractLending = require("./contract/Lending.json");
const Web3 = require("web3");
require("dotenv").config();
const rpcURL = process.env.WEB3_ENDPOINT;
const web3 = new Web3();
const fs = require("fs");
web3.setProvider(new Web3.providers.WebsocketProvider(rpcURL));
const Lending = process.env.LENDING_ADDRESS;
const abiLending = contractLending.abi;
const lending = new web3.eth.Contract(abiLending, Lending);
const TokenRateServices = require("./services/TokenRateServices");
const RequestServices = require("./services/RequestServices");
const AccountServices = require("./services/AccountServices");
const {sendEmail} = require("./reader");


var lastBlock = process.env.LAST_BLOCK;
var oldBlock = process.env.LAST_BLOCK;
const saveConfig = () => {
    var data = fs.readFileSync(".env", { encoding: "utf8", flag: "r" });
    data = data.replace(
        "LAST_BLOCK=" + oldBlock,
        "LAST_BLOCK=" + lastBlock
    );
    oldBlock = lastBlock;
    fs.writeFileSync(".env", data);
};
const getEvent = async () => {
    var toBlock = (await web3.eth.getBlockNumber()) * 1;
    if (lastBlock == toBlock) {
        return;
    }
    console.log({ lastBlock, toBlock });

    lending.getPastEvents(
        "UpdateTokenList",
        { fromBlock: lastBlock, toBlock: toBlock },
        async (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            for (let i = 0; i < res.length; i++) {
                var data = {
                    _token: res[i].returnValues._token,
                    _rate: res[i].returnValues._rate,
                };
                console.log(res[i].event, data);
                await TokenRateServices.updateTokenRate(data._token, data._rate);
            }
        }
    );
    lending.getPastEvents(
        "InsertTokenList",
        { fromBlock: lastBlock, toBlock: toBlock },
        async (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            for (let i = 0; i < res.length; i++) {
                var data = {
                    _token: res[i].returnValues._token,
                    _rate: res[i].returnValues._rate,
                };

                console.log(res[i].event, data);
                TokenRateServices.insertNewTokenRate(data);
            }
        }
    );
    lending.getPastEvents(
        "LenderMakeRequest",
        { fromBlock: lastBlock, toBlock: toBlock },
        async (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            for (let i = 0; i < res.length; i++) {
                var data = {
                    _lender: res[i].returnValues._lender.toLowerCase(),
                    _NFTadr: res[i].returnValues._NFTadr,
                    _tokenId: res[i].returnValues._tokenId,
                    _amount: res[i].returnValues._amount,
                    _tokenName: res[i].returnValues._tokenName,
                    _amountTime: res[i].returnValues._amountTime,
                    _requestNumber: res[i].returnValues._requestNumber,
                };
                console.log( res[i].event, data);
                await RequestServices.addRequest(data);
            }
        }
    );
    lending.getPastEvents(
        "AdminApproveRequest",
        { fromBlock: lastBlock, toBlock: toBlock },
        async (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            for (let i = 0; i < res.length; i++) {
                var data = {
                    _requestNumber: res[i].returnValues._requestNumber,
                };
                console.log( res[i].event, data);
                RequestServices.AdminApproveRequest(data);
            }
        }
    );
    lending.getPastEvents(
        "LenderDeposit",
        {fromBlock:lastBlock, toBlock:toBlock},
        async(err, res) => {
            if(err) {
                console.log(err);
                return;
            }
            for (let i = 0; i < res.length; i++) {
                var data = {
                    _requestNumber: res[i].returnValues._requestNumber,
                    _deadLine: res[i].returnValues._deadLine,
                }
                console.log( res[i].event, data);
                RequestServices.LenderDeposit(data);
            }
            
        }
    )
    lending.getPastEvents(
        "LenderExtendContract",
        {fromBlock: lastBlock, toBlock: toBlock},
        async (err, res) =>{
            if(err) {
                console.log(err);
                return;
            }
            for (let i = 0; i < res.length; i++) {
                var data = {
                    _requestNumber: res[i].returnValues._requestNumber,
                    _deadLine : res[i].returnValues._deadLine
                }
                console.log(res[i].event, data);
                await RequestServices.LenderExtendContract(data);
            }
        }
    )
    lending.getPastEvents(
        "sendNFT",
        {fromBlock: lastBlock, toBlock:toBlock},
        async(err, res) =>{
            if(err) {
                console.log(err);
                return;
            }
            for (let i = 0; i < res.length; i++) {
                var data = {
                    _caller : res[i].returnValues._caller,
                    _requestNumber: res[i].returnValues._requestNumber,
                    _outTime: res[i].returnValues._outTime
                }
                console.log(res[i].event, data);
                await RequestServices.sendNFT(data);
                const account = await RequestServices.getReqAccount({ info: data._requestNumber});
                if (account._email) {
                    sendEmail(
                        account._email,
                        "Sumup app: Send NFT",
                        `Your NFT has been sent to ${data._caller}` );
                }
                

            }
        }
    )
    lastBlock = toBlock + 1;
    saveConfig();
};

setInterval(async function () {
    await getEvent();
}, 2500);
