#!/usr/bin/env node

var program = require('commander');
var path = require('path');
var jsonfile = require('jsonfile');
var prompt = require('prompt');
var gcal = require('google-calendar');

var config = require('./config.js');

prompt.message = config.PROMPT_MSG;

program
    .version(config.VERSION)
    .usage('<description> <date : time> [options]')
    .parse(process.argv);

/**
 * Add homework to calendar
 */

// First retrieve access token from config file
var genConfigFile = path.join(__dirname, 'config.json');
var genConfig = jsonfile.readFileSync(genConfigFile);

var accessToken = genConfig['google-access-token'];

var calendar = config.CALENDAR;

// Load google calendar module
var googleCalendar = new gcal.GoogleCalendar(accessToken);

// Check to see if calendar `Homework-Beta` exists
// If not, create one
googleCalendar.calendarList.list(function(err, calendarList) {
    console.log(calendarList.items);
    // Search for owned calendar item with name `Homework`
    var calFound = false;
    console.log(calendarList.items.length);
    for(var i = 0; i < calendarList.items; i++) {
        var item = calendarList.items[i];
        if(item.summary === configCalendar.name && item.accessRole === calendar.accessRole)
            calFound = true;
    }

    // If not found, create one
    if(!calFound) {
        calendarList.items.push({
            kind: 'calendar#calendarListEntry',
            id: 'homework-cli',
            summary: calendar.name,
            timeZone: 'America/New_York',
            colorId: '6',
            backgroundColor: '#ffad46',
            foregroundColor: '#000000',
            selected: true,
            accessRole: 'owner',
            defaultReminders: []
        });

        googleCalendar.calendarList.insert(calendarList, {}, function(err, res) {
            console.log('Added new calendar!');
        });
    }
});
