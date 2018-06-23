const cheerio = require('cheerio');
const request = require('request');

const select = ({url, selectors, callback}) => {
  if (!url) return Promise.reject(new Error('url is required!'));
  if (!selectors) return Promise.reject(new Error('selectors are required!'));
  if (!callback) return Promise.reject(new Error('callback is required!'));

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