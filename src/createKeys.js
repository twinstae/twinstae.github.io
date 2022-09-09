const fs = require('node:fs');

const fileList = fs.readdirSync('./assets')
  .filter(name => name.endsWith('.index'));
fs.writeFileSync('./assets/keys.json', JSON.stringify(fileList), { encoding: 'utf8' });

console.log(fileList);
console.log('./assets/keys.json', ' is saved');
