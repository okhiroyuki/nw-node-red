'use strict';
const pkg = require('./package.json');
let options;
if (pkg.hasOwnProperty("NRnwjs")) { options = pkg["NRnwjs"] }

// Some settings you can edit if you don't set them in package.json
// console.log(options);
const listenPort = options.port || 18880;
const editable = options.editable || true;       // set this to false to create a run only application - no editor/no console
let flowfile = options.flowFile || 'nwjsflow.json'; // default Flows file name - loaded at start

const http = require('http');
const express = require("express");
const RED = require("node-red");
const os = require('os');
const fs = require('fs');

const red_app = express();

// Add a simple route for static content served from 'public'
red_app.use("/",express.static("web"));
//red_app.use(express.static(__dirname +"/public"));

// Create a server
var server = http.createServer(red_app);

let userdir = os.homedir + "/.nw-node-red";
if (editable) {
    // if running as raw electron use the current directory (mainly for dev)
    if (process.argv[1] && (process.argv[1] === "main.js")) {
        userdir = __dirname;
        if ((process.argv.length > 2) && (process.argv[process.argv.length-1].indexOf(".json") > -1)) {
            if (path.isAbsolute(process.argv[process.argv.length-1])) {
                flowfile = process.argv[process.argv.length-1];
            }
            else {
                flowfile = path.join(process.cwd(),process.argv[process.argv.length-1]);
            }
        }
    }
    else { // We set the user directory to be in the users home directory...
        userdir = os.homedir() + '/.nw-node-red';
        if (!fs.existsSync(userdir)) {
            fs.mkdirSync(userdir);
        }
        if ((process.argv.length > 1) && (process.argv[process.argv.length-1].indexOf(".json") > -1)) {
            if (path.isAbsolute(process.argv[process.argv.length-1])) {
                flowfile = process.argv[process.argv.length-1];
            }
            else {
                flowfile = path.join(process.cwd(),process.argv[process.argv.length-1]);
            }
        }
        else {
            if (!fs.existsSync(userdir+"/"+flowfile)) {
                fs.writeFileSync(userdir+"/"+flowfile, fs.readFileSync(__dirname+"/"+flowfile));
            }
            let credFile = flowfile.replace(".json","_cred.json");
            if (fs.existsSync(__dirname+"/"+credFile) && !fs.existsSync(userdir+"/"+credFile)) {
                fs.writeFileSync(userdir+"/"+credFile, fs.readFileSync(__dirname+"/"+credFile));
            }
        }
    }
}

const settings = {
    httpAdminRoot: "/red",
    httpNodeRoot: "/",
    flowFile: userdir + "/" + flowfile,
    userDir: userdir,
    nodesDir: userdir + "./nodes",
    editorTheme: {
        palette: {
            editable: false
        },
        projects: {
            enabled: false
        }
    },
    functionGlobalContext: { }
};

if (!editable) {
    settings.httpAdminRoot = false;
    settings.readOnly = true;
}

// Initialise the runtime with a server and settings
RED.init(server,settings);

// Serve the editor UI from /red (if editable)
if (settings.httpAdminRoot !== false) {
    red_app.use(settings.httpAdminRoot,RED.httpAdmin);
}

// Serve the http nodes UI from /
red_app.use(settings.httpNodeRoot,RED.httpNode);

server.listen(listenPort, function(err){
    if(err){
        console.log(err);
    }else{
        RED.start().then(function(err){
            if(err){
                console.log(err);
            }else{
                console.log("suucess");
            }
        });
    }
});

server.on('error', (err) => {
    console.log(err);
});
