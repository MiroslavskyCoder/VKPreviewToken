const electron = require("electron");
const path = require("path");
const toggleDevTools = require("./toggleDevTools");
const _CONFIG = require("./_CONFIG");
const _webPreferences = require("./_webPreferences");

const { BrowserWindow } = electron;

const main = new BrowserWindow({
    width: _CONFIG.width,
    height: _CONFIG.height,
    minWidth: _CONFIG.width,
    minHeight: _CONFIG.height,
    webPreferences: {
        preload: path.resolve(__dirname, "render.js"),
        ..._webPreferences
    },
    focusable: true, 
    backgroundColor: "#121212",
    center: true,
    darkTheme: true,
    vibrancy: "ultra-dark", 
    titleBarStyle: 'hidden',
    titleBarOverlay: { 
        color: "rgba(18, 18, 18, 1)",
        symbolColor: "rgba(255, 255, 255, 1)",
        height: 40
    },
    show: false 
});

module.exports = function(cb) {
    main.loadFile(path.resolve(__dirname, "..", "deps/app/build/index.html"));

    main.webContents.once("dom-ready", () => {
        if (typeof(cb)=="function") {
            cb();
        }

        main.show();
        
        main.webContents.on("before-input-event", (event, input) => {
            if (input.key == "F12") {
                toggleDevTools();
            }
        }); 
    });
}