const contractLending = require("../contract/LendingFactory.json");
const Web3 = require("web3");
const ReceiptService = require("../service/receipt.service");
const OfferService = require("../service/offer.service");
const web3 = new Web3();

web3.setProvider(
    new Web3.providers.WebsocketProvider("http://127.0.0.1:8545/")
);
const abiLending = contractLending.abi;
const lending = new web3.eth.Contract(
    abiLending,
    "0x5fbdb2315678afecb367f032d93f642f64180aa3"
);

var lastBlock = 0;
const getEvent = async () => {
    var toBlock = (await web3.eth.getBlockNumber()) * 1;
    console.log(lastBlock, toBlock);
    if (lastBlock == toBlock) {
        return;
    }
    lending.getPastEvents(
        "VendorMakeRequest",
        { fromBlock: lastBlock, toBlock: toBlock },
        async (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            if (res) {
                for (let i = 0; i < res.length; i++) {
                    const data = {
                        receiptNumber: res[i].returnValues.requestNumber,
                        vendor: res[i].returnValues.vendor,
                        NFTAddress: res[i].returnValues.NFTAddress,
                        tokenId: res[i].returnValues.tokenId,
                    };
                    try {
                        await ReceiptService.addNewReceipt(data);
                    } catch (error) {
                        console.log({ error });
                    }
                }
            }
        }
    );
    lending.getPastEvents(
        "LenderMakeOffer",
        { fromBlock: lastBlock, toBlock: toBlock },
        async (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            if (res) {
                for (let i = 0; i < res.length; i++) {
                    const data = {
                        receiptNumber : res[i].returnValues.requestNumber,
                        offerNumber: res[i].returnValues.offerNumber,
                        offerTokenAmount : res[i].returnValues.offerTokenAmount,
                        offerTokenRate : res[i].returnValues.offerRate,
                        offerAmountOfTime : res[i].returnValues.offerAmountOfTime,
                        lendor : res[i].returnValues.lender,
                    };
                    try {
                        await OfferService.addNewOffer(data);
                    } catch (error) {
                        console.log({ error });
                    }
                }
            }
        }
    );
    lastBlock = toBlock;
};

setInterval(async function () {
    await getEvent();
}, 2500);
