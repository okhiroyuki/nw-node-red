const http = require('http');
const express = require("express");
const RED = require("node-red");
const os = require('os');
const fs = require('fs');

const app = express();
const port = 1880;

const HOME_DIR = os.homedir + "/.nw-node-red"

app.use("/",express.static("public"));

const server = http.createServer(app);
server.on('error', (err) => {
    console.log(err);
});

const settings = {
    httpAdminRoot:"/red",
    httpNodeRoot: "/api",
    userDir: HOME_DIR,
    nodesDir: HOME_DIR + "/nodes",
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

RED.init(server,settings);

app.use(settings.httpAdminRoot,RED.httpAdmin);

app.use(settings.httpNodeRoot,RED.httpNode);

server.listen(port, function(err){
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