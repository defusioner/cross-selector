import select from '../index'

const url = 'https://news.ycombinator.com/'
const selectors = '.athing .title > a'

const callback = (cheerio, results) => {
  let articles = []
  results.each((i, elem) => {
    articles = [
      ...articles,
      {
        url: cheerio(elem).attr('href'),
        text: cheerio(elem)
          .text()
          .trim()
      }
    ]
  })
  return articles
}

select({ url, selectors, callbacks: callback }).then(result => {
  console.log(result)
})
