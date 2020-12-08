import fs from 'fs';

export function getList() {
    return JSON.parse(fs.readFileSync("./santa.json"));
}

export function getConfig() {
    return JSON.parse(fs.readFileSync("./config.json"));
}