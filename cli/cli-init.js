#!/usr/bin/env node

var program = require('commander');
var fs = require('fs');
var path = require('path');
var jsonfile = require('jsonfile');
var prompt = require('prompt');

var config = require('./config.js');

prompt.message = 'Homework-CLI';

program
    .version(config.VERSION)
    .usage('[options]')
    .parse(process.argv);

/**
 * Create a new config file (config.json)
 */

var configFile = path.join(__dirname, 'config.json');

// If config file already exists, confirm overwrite
if(fs.existsSync(configFile)) {
    prompt.start();
    prompt.get({
        name: 'confirmation',
        default: 'y',
        description: 'Are you sure you want to overwrite your config file?'
    }, function(err, resultConf) {
        var conf = resultConf.confirmation.toLowerCase();

        // Begin overwrite
        if(conf === 'y' || conf === 'yes') {
            // Remove file
            fs.unlinkSync(configFile);

            // Request user to input google access key with calendar scope
            prompt.start();
            prompt.get({
                name: 'accessToken',
                description: 'Enter Google access token string (Calendar scope)'
            }, function(err, result) {
                //TODO: Check whether token is valid and has calendar scope

                var configData = {
                    'google-access-token': result.accessToken
                };

                jsonfile.writeFileSync(configFile, configData);
            });
        } else {
            process.exit(0);
        }
    });
}
