import cheerio from 'cheerio';
import request from 'request';

const errors = {
  URL_REQUIRED: 'url is required!',
  SELECTORS_REQUIRED: 'selectors are required!',
  CALLBACK_REQUIRED: 'callback is required!',
  MANY_TO_MANY: 'In this configuration (array of callbacks), selectors should be an array!',
  MANY_TO_MANY_SIZE: 'Selectors and callbacks sizes are different!'
};

function select({
  url,
  selectors,
  callbacks
}) {
  if (!url) return promiseError(errors.URL_REQUIRED);
  if (!selectors) return promiseError(errors.SELECTORS_REQUIRED);
  if (!callbacks) return promiseError(errors.CALLBACK_REQUIRED);
  const selectorsIsArray = selectors.constructor === Array;
  const callbacksIsArray = callbacks.constructor === Array;

  if (callbacksIsArray) {
    if (!selectorsIsArray) {
      return promiseError(errors.MANY_TO_MANY);
    }

    if (selectors.length !== callbacks.length) {
      return promiseError(errors.MANY_TO_MANY_SIZE);
    }
  }

  return new Promise((resolve, reject) => request(url, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html);

      switch (true) {
        // Simple case, 1 selector -> 1 callback
        case !selectorsIsArray && !callbacksIsArray:
          resolve(callbacks(cheerio, $(selectors)));
          break;
        // Middle case, many selectors -> 1 callback for all

        case selectorsIsArray && !callbacksIsArray:
          resolve(runCallback($, selectors, callbacks));
          break;
        // Complex case, many selectors -> many unique callbacks

        case selectorsIsArray && callbacksIsArray:
          resolve(selectors.reduce((total, selector, i) => [...total, runCallback($, selector, callbacks[i])], []));
          break;
      }
    } else {
      reject(error);
    }
  }));
}

const runCallback = ($, selector, callback) => {
  const allSelectors = selector.constructor === Array ? selector.join(',') : selector;
  return callback(cheerio, $(allSelectors));
};

const promiseError = message => Promise.reject(message);

export default select;
