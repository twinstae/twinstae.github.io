const splitKorean = require('./splitKorean');

const fs = require('node:fs');
const { Document } = require("flexsearch");

const index = new Document({
  doc: {
    id: "name",
    field: ["content"]
  },
  encode: splitKorean
});

const fileList = fs.readdirSync('./src/routes/blog')
  .filter(name => name.endsWith('.md'))

fileList
  .map(name => fs.readFileSync(`./src/routes/blog/${name}`, { encoding: 'utf8' }))
  .map(content => content.split("---")[2].trim().replace(/([#>-]|{{[^}]+}})/g, ''))
  .forEach((content, i) => index.add({
    name: fileList[i],
    content,
  }))

index.export(function(key, data){ 
  const filePath = './assets/'+key+'.index'

  fs.writeFileSync(filePath, data || '', { encoding: 'utf8' })
  console.log(filePath, ' is saved')
});
