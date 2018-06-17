## About
Simple cross-domain css selectors

## Install
`npm i cross-selector`

## Usage

```
import {select} from 'cross-selector';

const callback = (cheerio, results) => {
  if (cheerio(results).text().includes("8th-generation"))
    return `Available!`;
  else
    return 'No new macs for today...';
}

select("www.applesite.com", '.as-macbundle-modelspecs li', callback);
```
