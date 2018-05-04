#!/usr/bin/env node
/* jshint node: true, esversion: 6 */
const path = require('path');

const nodemon = require('nodemon');

const realCwd = process.cwd();
const appCwd = __dirname;

const script = path.resolve(appCwd, 'start.js');

nodemon({
  script,
  cwd: realCwd,
  ext: 'js',
  watch: appCwd,
  ignore: ['node_modules'],
  stdout: true
});
