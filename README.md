# iDAI.field 2 Web

## Prerequisites

The iDAI.field2 development stack runs under MacOS, Windows, Linux. 

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

`npm start` start the electron app. Besides starting the application the command takes 
care that changes made to scss files result in automatic conversion to css.