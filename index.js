const cheerio = require('cheerio');
const request = require('request');

const select = (url, selectors, callback) => {
  return new Promise((resolve, reject) => {
    request(url, function (error, response, html) {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);

        const items = $(selectors.join(','));

        resolve(callback(cheerio, items))
      } else {
        reject(error);
      }
    });
  });
};

module.exports = {
  select
};