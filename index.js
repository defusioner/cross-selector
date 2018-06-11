const cheerio = require('cheerio');
const request = require('request');

const select = (url, selector) => {
  return new Promise((resolve, reject) => {
    request(url, function (error, response, html) {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);
        const selectorResults = $(selector);

        resolve(selectorResults.html())
      } else {
        reject(error);
      }
    });
  });
};

const selectAll = (url, selector, callback) => {
  return new Promise((resolve, reject) => {
    request(url, function (error, response, html) {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);
        const items = $(selector);

        resolve(callback(cheerio, items))
      } else {
        reject(error);
      }
    });
  });
};

module.exports = {
  select,
  selectAll
};