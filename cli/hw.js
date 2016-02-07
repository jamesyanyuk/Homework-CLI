#!/usr/bin/env node

var program = require('commander');

var fs = require('fs');
var path = require('path');

var config = require('./config.js');

program
    .version(config.VERSION)
    .usage('<cmd> [arguments] [options]')
    .command('init', 'Run CLI initialization')
    .command('add', 'Add homework assignment to calendar')
    //.command('list', 'List homework assignments for a given day')
    //.command('rem', 'Remove a homework assignment from calendar')
    .parse(process.argv);
