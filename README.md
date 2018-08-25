## About
Simple cross-domain css selectors

## Install
`npm i cross-selector`

## Usage

- One selector, one callback (hackernews articles)

```
import {select} from 'cross-selector';

const url = 'https://news.ycombinator.com/';
const selectors = '.athing .title > a';

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

select({url, selectors, callbacks: callback}).then(result => {
  console.log(result);
});
```

- Many selectors, one callback
```
const selectors = [
  '.nw-c-top-stories__secondary-item a.gs-c-promo-heading',
  '.nw-c-full-story .gs-c-promo .gs-c-promo-body a.gs-c-promo-heading'
];

select({url, selectors, callbacks: callbackArticles}).then(results => {
  console.log(results);
});

```

- Many selectors, many callbacks
```
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

select({url, selectors, callbacks: [callbackArticles, callbackSources]}).then(results => {
  console.log(results)
});
```
