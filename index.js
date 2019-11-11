import cheerio from 'cheerio'
import request from 'request'

export default function select({ url, selectors, callbacks }) {
  if (!url) return promiseError('url is required!')
  if (!selectors) return promiseError('selectors are required!')
  if (!callbacks) return promiseError('callback is required!')

  if (callbacks.constructor === Array) {
    if (selectors.constructor !== Array) {
      return promiseError(
        'In this configuration (array of callbacks), selectors should be an array!'
      )
    }
    if (selectors.length !== callbacks.length) {
      return promiseError('Selectors and callbacks sizes are different!')
    }
  }

  return new Promise((resolve, reject) =>
    request(url, (error, response, html) => {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html)

        let result

        if (selectors.constructor !== Array) {
          // Simple case, 1 selector = 1 callback
          result = callbacks(cheerio, $(selectors))
        } else if (callbacks.constructor === Array) {
          // Complex case, many to many
          result = selectors.reduce(
            (total, selector, i) => [
              ...total,
              runCallback($, selector, callbacks[i])
            ],
            []
          )
        } else {
          // Many selectors, common callback
          result = runCallback($, selectors, callbacks)
        }

        resolve(result)
      } else {
        reject(error)
      }
    })
  )
}

const runCallback = ($, selector, callback) => {
  const allSelectors =
    selector.constructor === Array ? selector.join(',') : selector
  return callback(cheerio, $(allSelectors))
}

const promiseError = message => Promise.reject(new Error(message))
