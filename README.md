# Google Calendar Homework Extension CLI

![homework](https://raw.githubusercontent.com/jyanyuk/Node-Homework/master/banner.png)

[![npm](https://img.shields.io/npm/v/homework.svg)](https://www.npmjs.com/package/homework)
[![npm](https://img.shields.io/npm/dm/homework.svg)](https://www.npmjs.com/package/homework)

[![NPM](https://nodei.co/npm/homework.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/homework/)

```
$ hw --help
   Usage: hw <command>

   hw init
   hw add "<homework description>" "<due date and time>"
       example: hw add "physics reading ch. 5" "2/1/16 2:00 pm"

$ hw add "CS 383: read chapter 14" "3/12/16 7:00 pm"
   Homework-CLI: Added homework to calendar.
```

## Installation

Install the CLI:

```
$ npm install -g homework
```

### Setup

You must first acquire a google calendar token. One can be obtained by using the *google-oauth-quick-token* tool, found [here](https://www.npmjs.com/package/google-oauth-quick-token). Follow the **Running the program** guide, and select the *Calendar* API and scope when prompted to do so. Save the access token string for use below!

Run the init command:

```
$ hw init
```

You'll be prompted to submit your access token string:

```
$ hw init
   Please enter your Google access token string (calendar scope):
   <ACCESS-TOKEN-STRING>
```

You may now add homework assignments using the provided commands, as shown below.

## Usage

Run the help command to view the list of commands, varying depending on *homework* version:

```
$ hw -h
```

### Setup Initialization

```
$ hw init
```

Follow the guide above in **Installation: Setup**.

### Add a homework assignment

To add a homework assignment, run the following command:

```
$ hw add "<homework description>" "<due date and time>"
```

This will add a homework item to your calendar.
