# iDAI.field 2 Homepage

## Prerequisites

The iDAI.field 2 development stack runs under MacOS, Windows, Linux. 

You need the following components in order for the local server to work:

* Node Package Manager ([NPM](https://www.npmjs.com/)) 

## Quickstart

Clone this repository locally and run

```
$ npm install
$ npm run build
$ npm start
```

`npm run build` compiles the typescript files and creates configuration files.
The typescript files are compiled once, so it is recommended to configure your IDE to 
do that continuously in the background for you.


## Development

If started with `npm start`, a webserver will get started, which will use 
a rest api of the idai-field server by default, but can be configured via gulpfile.js
to use another server.

For local full stack development however there is better solution:
iDAI.field 2 Homepage is designed to use [jeremy](https://github.com/dainst/jeremy), which
can be configured to server single page applications via the `SPASupport=true` switch.
Symlink your idai-field-homepage repo to the `public` under your local jeremy checkout
and start jeremy instead of using `npm start` and jeremy will serve iDAI.field 2 Homepage
as well as the backend api necessary for running the app.
