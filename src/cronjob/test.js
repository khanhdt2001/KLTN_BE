const CronJob = require("cron").CronJob;
const axios = require("axios");
const NftService = require("../service/nft.service");

const crawl = async () => {
   console.log("hihihihih");
   const response = await axios.get(
      "https://api.coinmarketcap.com/data-api/v3/nft/collections?start=0&limit=10&sort=volume&desc=true&period=1"
   );

   //    console.log("response", response.data.data.collections);
   const collection = response.data.data.collections;
   console.log("collection", collection.length);
   // console.log(collection[0].blockchain);
   //    const { nfts: a, total: b } = await NftService.getAllNft();
   collection.map((data) => {
      console.log("data", data);
   });
   const a = [
      {
         _id: {
            $oid: "64099389cb62fb1b90b739c3",
         },
         webAddress: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
         __v: 0,
      },
   ];
      a.forEach((data) => {
         const found = collection.find(
            (element) =>
               element.blockchain === "Ethereum" &&
               element.contractAddress === data.contractAddress
         );
         console.log("found", found);
         if (found) {
            console.log("data", data);
            console.log("found", found);
         }
      });
};
crawl();
