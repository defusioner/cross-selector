const select = require('.').select;

const url = 'http://football.ua/';
const selectors = [".main-news ul li a", ".main-article .text h3 a"];

const callback = (cheerio, results) => {
  let articles = [];
  results.each((i, elem) => {
    articles = [...articles, {
      url: cheerio(elem).attr('href'),
      text: cheerio(elem).text().trim()
    }];
  });
  return articles;
};

select({url, selectors, callback}).then(articles => {
  console.log(articles)
});


