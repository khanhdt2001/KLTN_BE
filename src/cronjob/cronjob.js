const CronJob = require("cron").CronJob;
const axios = require("axios");
const NftService = require("../service/nft.service");
const fs = require('fs');
const crawl = async () => {
   console.log("hihihihih");
   const response = await axios.get(
      "https://api.coinmarketcap.com/data-api/v3/nft/collections?start=0&limit=10&sort=volume&desc=true&period=1"
   );
   fs.writeFile('./src/model/resource/supported_nft.json',JSON.stringify(response.data.data), (err) => {
      if (err) throw err;
      console.log('Data written to file');
  });
   const collection = response.data.data.collections;
   const { nfts: a, total: b } = await NftService.getAllNft();
   a.forEach(async (data) => {
      const found = collection.find(
         (element) =>
            element.blockchain === "Ethereum" &&
            element.contractAddress === data.webAddress
      );
      if (found) {
        const nft = {
          NftAddress : data.webAddress,
          price : found.floorPrice,
        }
        await NftService.updateNft(nft)
      }
   });
};

var job = new CronJob("*/3 * * * *", crawl, null, true, "Asia/Ho_Chi_Minh");
job.start()
module.exports = job;
