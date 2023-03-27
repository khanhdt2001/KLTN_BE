const CronJob = require("cron").CronJob;
const axios = require('axios');
const crawl =() => {
    console.log("--------------------------------");
    axios.get('https://api.coinmarketcap.com/data-api/v3/nft/collections?start=0&limit=10&sort=volume&desc=true&period=1')
  .then(function (response) {
    const collection = response.data
    console.log(collection);
    console.log(collection.data.collections);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
}


var job = new CronJob(
    '* * * * * *',
    crawl,
    null,
    true,
    'Asia/Ho_Chi_Minh'
);
// job.start()
module.exports = job;