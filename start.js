#!/usr/bin/env node
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
  glob(
    ['*.jpeg', '*.jpg', '*png'],
    { cwd, onlyFiles: true, nocase: true }
  ).then((files) => {
    res.end(`
      <html>
        <style>
          html, body {
            padding: 0;
            margin: 0;
          }

          .img {
            position: relative;
            width: 100%;
            margin: 10px 0;

            color: white;
            font-family: sans-serif;
            font-weight: bold;
            text-shadow: 2px 2px 5px #000, -2px -2px 5px #000, -2px 2px 5px #000, 2px -2px 5px #000;
          }

          .img:before {
            content: attr(data-src);
            position: absolute;
            top: 10px;
            left: 10px;
            z-index: 1;
          }

          img {
            display: block;
            max-width: 100%;
            margin: 0 auto;
          }
        </style>

        <body>
          ${files.sort().map(file => {
            return `<div class="img" data-src="${file}"><img src="${file}" /></div>`;
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
