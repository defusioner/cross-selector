## About

Simple cross-domain css selectors.

Based on cheerio.

This library is primarily used to web scrapping, letting to associate each css selector with a post-processor callback.

In case of server error, it just rejects with it.

## Install

`npm i --save cross-selector`

## Usage

`import select from 'cross-selector'`

or

`const select = require('cross-selector')`

There are 3 modes of usage:

- One selector, one callback (hackernews articles)
- Many selectors, one callback (bbc favourites + ordinary news)
- Many selectors, many callbacks (bbc articles + bbc sources)

For code examples, see tests.
