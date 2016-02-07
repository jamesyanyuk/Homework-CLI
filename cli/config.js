var config = {};

config.CLIENT_NAME = 'Homework-CLI';

config.CLIENT_ID = '235566101309-dcj2g6cuk0kue8j67o8rq0eugv4r0bvt.apps.googleusercontent.com';
config.CLIENT_SECRET = '71vWPWs7dc1_08wjaH4ibKN3';

config.GOOGLE_AUTH = {
    name: config.CLIENT_NAME,
    client_id: config.CLIENT_ID,
    client_secret: config.CLIENT_SECRET,
    scope: ['https://www.googleapis.com/auth/calendar']
};

config.VERSION = '1.0.3';
config.CALENDAR = {
    summary: 'Homework-CLI',
    accessRole: 'owner'
};

module.exports = config;
