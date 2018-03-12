## About
Simple cross-domain css selectors

## Install
`npm i cross-selector`

## Usage

```javascript 1.8
const select = require('cross-selector');
 
async function main() {
  let res = await select(
    'https://www.apple.com/shop/buy-mac/macbook-pro', 
    '.as-macbundle-modelspecs li'
  );
 
  if (res.includes("8th-generation")) {
    console.log('New Mac available!')
  }
}
```
