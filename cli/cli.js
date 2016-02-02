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

/**
 * If config file missing or invalid, prompt user to run init
 */

// Check for existence of config.json in module directory
if(!fs.existsSync(path.join(__dirname, 'config.json'))
    && program.args[0] !== 'init') {
    // Prompt user
    console.log('Homework-CLI: Before continuing, run `hw init`.');
    process.exit(0);
}
