/* jshint node: true, esversion: 6 */

const express = require('express');
const glob = require('fast-glob');

const app = express();
const dir = process.cwd();

app.use('*', (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.get('/', (req, res) => {
  glob(['*.jpeg', '*.jpg', '*png']).then((files) => {
    res.end(`
      <html>
        <body>
          ${files.map(file => {
            return `<img src=${file} />`;
          }).join('<br>')}
        </body>
      </html>
    `);
  }).catch(err => {
    res.writeHead(500);
    res.end(err.message);
  });
});

app.listen(8000);
