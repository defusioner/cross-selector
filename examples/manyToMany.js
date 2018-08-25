const select = require('..').select;

const url = 'https://www.bbc.com/news';
const selectors = [
  '.nw-c-top-stories__secondary-item a.gs-c-promo-heading',
  '.nw-c-full-story .gs-c-promo .gs-c-promo-body a.gs-c-promo-heading'
];

const callbackArticles = (cheerio, results) => {
  let articles = [];
  results.each((i, elem) => {
    articles = [...articles, {
      url: cheerio(elem).attr('href'),
      text: cheerio(elem).text().trim()
    }];
  });
  return articles;
};

const callbackSources = (cheerio, results) => {
  let articles = [];
  results.each((i, elem) => {
    articles = [...articles, {
      source: cheerio(elem).attr('href'),
      text: cheerio(elem).text().trim()
    }];
  });
  return articles;
};

const callbacks = [
  callbackArticles,
  callbackSources
];

select({url, selectors, callbacks}).then(results => {
  console.log(results)
});
