#!/usr/bin/env node

var program = require('commander');

var fs = require('fs');
var path = require('path');
var jsonfile = require('jsonfile');
var inquirer = require('inquirer');
var authGoogle = require('auth-google');

var google = require('googleapis');
var gcal = google.calendar('v3');

var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2();

var config = require('./config.js');

program
    .version(config.VERSION)
    .usage('[options]')
    .parse(process.argv);

/**
 * Create a new config file (config.json)
 */

var homePath = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;

var configFile = path.join(__dirname, '../', 'config.json');
var tokenFile = path.join(homePath, '.config', config.CLIENT_NAME, 'token.json');

// Config file object
var configObj = {};

// If config file already exists, confirm overwrite
if(fs.existsSync(configFile) || fs.existsSync(tokenFile)) {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'toOverwrite',
            message: 'Are you sure you want to overwrite your config file(s)?',
            default: true
        }
    ], function (answers) {
        if(answers.toOverwrite) {
            // Remove files
            if(fs.existsSync(configFile))
                fs.unlinkSync(configFile);
            if(fs.existsSync(tokenFile))
                fs.unlinkSync(tokenFile);

            createCalendar();
        } else {
            process.exit(0);
        }
    });
} else {
    createCalendar();
}

function writeConfigFile(configObj) {
    // Write to file
    jsonfile.writeFileSync(configFile, configObj);
}

function readConfigFile() {
    // Read from file
    return jsonfile.readFileSync(configFile);
}

function createCalendar() {
    authGoogle(config.GOOGLE_AUTH, function(error, token) {
        oauth2Client.setCredentials({
            access_token: token.access_token,
            refresh_token: token.refresh_token
        });

        // Check to see if calendar exists, and user is owner
        gcal.calendarList.list({
            auth: oauth2Client
        }, function (err, calendarList) {
            // See if calendar list contains our calendar
            var result = calendarList.items.filter(function (item) {
                if (item.accessRole === config.CALENDAR.accessRole) {
                    return item.summary == config.CALENDAR.summary;
                }
            });

            if (result.length > 0) {
                // If calendar exists already, store id of calendar in config file
                var calendarId = result[0].id;
                configObj.calendarId = calendarId;

                // Create config file
                writeConfigFile(configObj);

                console.log('  Homework-CLI: Finished initializing the CLI!');
                process.exit(0);
            } else {
                // Otherwise, create a new calendar
                gcal.calendars.insert({
                    auth: oauth2Client,
                    resource: {
                        summary: config.CALENDAR.summary
                    }
                }, function (err, calendarEntry) {
                    // Now store id of new calendar in config file
                    var calendarId = calendarEntry.id;
                    configObj.calendarId = calendarId;

                    // Create config file
                    writeConfigFile(configObj);

                    console.log('  Homework-CLI: Finished initializing the CLI!');
                    process.exit(0);
                });
            }
        });
    });
}
