const select = require('..').select;

const url = 'http://football.ua/';
const selectors = [
  [".main-news ul li a", ".main-article .text h3 a"],
  '#matchCenterBlock tr'
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

const callbackGames = (cheerio, results) => {
  let games = [];
  results.each((i, elem) => {
    const element = cheerio(elem);

    const time = element.find('.time');
    const team1 = element.find('.left-team');
    const team2 = element.find('.right-team');
    const score = element.find('.score .score-holder > a');

    const game = `${time.text().trim()} ${team1.text().trim()} ${score.text().trim()} ${team2.text().trim()}`.trim();

    if (game) {
      games = [...games, game]
    }
  });
  return games;
};

const callbacks = [
  callbackArticles,
  callbackGames
];

select({url, selectors, callbacks}).then(results => {
  console.log(results)
});
