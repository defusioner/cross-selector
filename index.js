const cheerio = require('cheerio');
const request = require('request');

const select = (url, selectors, callback) => {
  return new Promise((resolve, reject) => {
    request(url, (error, response, html) => {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);

        const allSelectors = selectors.constructor === Array ? selectors.join(',') : selectors;

        const items = $(allSelectors);

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