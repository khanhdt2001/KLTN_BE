const contractLending = require("../contract/LendingFactory.json");
const Web3 = require("web3");
require("dotenv").config();

const rpcURL = process.env.WEB3_ENDPOINT;
const web3 = new Web3();

web3.setProvider(new Web3.providers.WebsocketProvider(rpcURL));
const Lending = process.env.LENDING_FACTORY_ADDRESS;
const abiLending = contractLending.abi;
const lending = new web3.eth.Contract(abiLending, Lending);

const getEvent = async () => {
   lending.events
      .RegisterLending(
         {
            fromBlock: 0,
         },
         function (error, event) {
            console.log(event);
         }
      )

};

getEvent();
