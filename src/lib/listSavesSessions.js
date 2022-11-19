const zlib = require("node:zlib");
const realFs = require('fs');
const gracefulFs = require('graceful-fs');
const path = require("path");
const envPaths = require('env-paths');

gracefulFs.gracefulify(realFs);

module.exports = function listSavesSessions() {
    const paths = envPaths("VKPreviewToken", {
        suffix: ""
    }); 

    if (gracefulFs.existsSync(paths.data) && gracefulFs.statSync(paths.data).isDirectory()) {
        const _files = gracefulFs.readdirSync(paths.data);
        console.log(_files);
    }
    return [];   
}