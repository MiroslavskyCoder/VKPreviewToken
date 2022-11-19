const electron = require("electron"); 
const minimist = require("minimist");

const _parseArgs = () => {
    return minimist(process.argv, { "--": true });
}

window.VKPreviewToken = { 
    versions: {
        node: () => process.versions.node,
        chrome: () => process.versions.chrome,
        electron: () => process.versions.electron,
    },
    exit(code = 0) {
        electron.app.exit(code);
    },
    hide() {
        electron.app.hide();
    },
    parseArgs() { 
        return _parseArgs();
    },
    isDev() {
        return _parseArgs()["dev"] || false;
    },
    require,
    process
};