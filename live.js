#!/usr/bin/env node
/* jshint node: true, esversion: 6 */
const path = require('path');

const nodemon = require('nodemon');

const realCwd = process.cwd();
const appCwd = __dirname;

const script = path.resolve(appCwd, 'start.js');

var thing = nodemon({
  script,
  cwd: realCwd,
  ext: 'js',
  watch: appCwd,
  ignore: ['node_modules'],
  scriptPosition: 0, args: []
}).on('log', function (log) {
  // print messages logged by nodemon itself
  console.log(log.colour || log.message);
});
