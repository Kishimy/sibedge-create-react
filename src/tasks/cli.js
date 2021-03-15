"use strict";
exports.__esModule = true;
var fs = require("fs");
var _a = process.argv, args = _a.slice(2);
var addConsoleMsg = function (msg) {
    console.log();
    console.log('-------------------------------------------------------');
    console.log(msg);
    console.log('-------------------------------------------------------');
    console.log();
};
var createComponent = function (name) {
    if (fs.existsSync(name)) {
        addConsoleMsg("Folder with name \"" + name + "\" already exist");
        return;
    }
    fs.mkdir(name, function () {
        Promise.all([
            new Promise(function (resolve) {
                fs.readFile('./templates/indexTemplate.txt', 'utf-8', function (_err, data) {
                    fs.writeFile("./" + name + "/index.tsx", data.replace(/%{Template}%/gi, name), function () {
                        resolve("./" + name + "/index.tsx");
                    });
                });
            }),
            new Promise(function (resolve) {
                fs.writeFile("./" + name + "/constants.ts", '', function () {
                    resolve("./" + name + "/constants.ts");
                });
            }),
            new Promise(function (resolve) {
                fs.readFile('./templates/modelsTemplate.txt', 'utf-8', function (_err, data) {
                    fs.writeFile("./" + name + "/models.tsx", data, function () {
                        resolve("./" + name + "/models.tsx");
                    });
                });
            })
        ]).then(function () {
            addConsoleMsg("Folder with component \"" + name + "\" successfully created");
        });
    });
};
createComponent(args[0].replace(/ /g, ''));
