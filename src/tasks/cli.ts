#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';

const [,, ...args] = process.argv;
const addConsoleMsg = (msg: string) => {
    console.log();
    console.log('-------------------------------------------------------');
    console.log(msg);
    console.log('-------------------------------------------------------');
    console.log();
}

const createComponent = (name: string) => {
    if (fs.existsSync(name)) {
        addConsoleMsg(`Folder with name "${name}" already exist`);
        return;
    }

    fs.mkdir(name, () => {
        Promise.all([
            new Promise((resolve) => {
                fs.readFile(path.resolve(__dirname, '../templates/indexTemplate.txt'), 'utf-8', (_err, data) => {
                    fs.writeFile(`./${name}/index.tsx`, data.replace(/%{Template}%/gi, name), () => {
                        resolve(`./${name}/index.tsx`);
                    })
                });
            }),
            new Promise((resolve) => {
                fs.writeFile(`./${name}/constants.ts`, '', () => {
                    resolve(`./${name}/constants.ts`);
                });
            }),
            new Promise((resolve) => {
                fs.readFile(path.resolve(__dirname, '../templates/modelsTemplate.txt'), 'utf-8', (_err, data) => {
                    fs.writeFile(`./${name}/models.ts`, data, () => {
                        resolve(`./${name}/models.ts`);
                    })
                });
            })
        ]).then(() => {
            addConsoleMsg(`Folder with component "${name}" successfully created`);
        });
    });
}

createComponent(args[0].replace(/ /g,''));