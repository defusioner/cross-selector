const select = require('..').select;

const url = "https://www.apple.com/shop/buy-mac/macbook-pro";
const selectors = ".as-macbundle-modelspecs li";

const callback = (cheerio, results) => {
  if (cheerio(results).text().includes("8th-generation"))
    return `Available!`;
  else
    return 'No new macs for today...';
};

select({url, selectors, callbacks: callback}).then(result => {
  console.log(result);
});
