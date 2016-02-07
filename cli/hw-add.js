#!/usr/bin/env node

var program = require('commander');

var fs = require('fs');
var path = require('path');
var jsonfile = require('jsonfile');
var inquirer = require('inquirer');
var authGoogle = require('auth-google');
var validator = require('validator');

var google = require('googleapis');
var gcal = google.calendar('v3');

var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2();

var config = require('./config.js');

program
    .version(config.VERSION)
    .usage('<title> <date & time> [options]')
    .option('-d, --desc <value>', 'Description of homework assignment')
    .parse(process.argv);

/**
 * If config file missing or invalid, prompt user to run init
 */

// Check for existence of config.json in module directory
if(!fs.existsSync(path.join(__dirname, 'config.json'))
    && program.args[0] !== 'init') {
    // Prompt user
    console.log('  Homework-CLI: Before continuing, run `hw init`.');
    process.exit(0);
}

/**
 * Add homework to calendar
 */

// First retrieve access token from config file
var genConfigFile = path.join(__dirname, 'config.json');
var genConfig = jsonfile.readFileSync(genConfigFile);

// Pull calendar id from config
var calendarId = genConfig.calendarId;

var calendar = config.CALENDAR;

// Parse out title and date from provided arguments
var title = program.args[0];
var dateTime = validator.toDate(program.args[1]);

// Optional arguments
var description = program.desc;

// Check for valid inputs
if(!title || !dateTime) {
    console.log('  Must provide title and valid date:time as arguments.\n' +
            '    - Example: `hw add "Physics 151 Lab 2" "2/14/16 5:00 pm"`\n' +
            '    - Refer to `hw add --help`');
    process.exit(0);
}

authGoogle(config.GOOGLE_AUTH, function(err, token) {
    oauth2Client.setCredentials({
        access_token: token.access_token,
        refresh_token: token.refresh_token
    });

    gcal.events.insert({
        auth: oauth2Client,
        calendarId: calendarId,
        resource: {
            summary: title,
            start: { dateTime: dateTime },
            end: { dateTime: dateTime },
            description: description ? description : ''
        }
    }, function(err, event) {
        if(err || !event) {
            console.log('  Homework-CLI: Failed to add assignment to calendar!');
            process.exit(0);
        }

        console.log('  Homework-CLI: Added assignment to calendar!');
    });
});
