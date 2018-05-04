/* jshint node: true, esversion: 6 */

const express = require('express');
const glob = require('fast-glob');

const app = express();
const cwd = process.cwd();

app.use('*', (req, res, next) => {
  console.log(`${req.method} ${req.baseUrl}`);
  next();
});

app.use(express.static(cwd));

app.get('/', (req, res) => {
  glob(['*.jpeg', '*.jpg', '*png'], { cwd, onlyFiles: true, nocase: true }).then((files) => {
    res.end(`
      <html>
        <style>
          html, body {
            padding: 0;
            margin: 0;
          }

          img {
            max-width: 100%;
            margin: 10px 0;
          }
        </style>

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
