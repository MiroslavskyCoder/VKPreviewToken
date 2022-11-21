const updaterElectron = require("update-electron-app");

function updater(options) {
    options ||= {}; 

    updaterElectron({
        repo: "MiroslavskyCoder/VKPreviewToken", 
        updateInterval: "1 hour",
        logger: require("electron-log")
    });

    options.init(() => {
        options.handlerUpdaterEnd();
    })
}

module.exports = updater;