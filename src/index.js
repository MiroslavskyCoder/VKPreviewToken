const electron = require("electron");
const path = require("path");

if (typeof(electron) == "string") {
    process.exit(-1);
}

const {
    app,
    BrowserWindow,
    ipcMain
} = electron;

/**
 * @type {import("electron").BrowserWindow}
 */
let main = null;

function toggleDevTools() {
    if (!main.webContents.isDevToolsOpened()) {
        main.webContents.openDevTools();
    } else {
        main.webContents.closeDevTools();
    }
}

const _webPreferences = {
    blinkFeatures: "EnumerateDevices,AudioOutputDevices",
    nodeIntegration: false, 
    nativeWindowOpen: true,
    enableRemoteModule: false,
    spellcheck: true,
    contextIsolation: true, 
    additionalArguments: [
        "--enable-node-leakage-in-renderers"
    ],
    nodeIntegration: true
}

function create() {
    const loading = new BrowserWindow({ 
        center: true,
        backgroundColor: "#121212",
        width: 512,
        height: 512,
        minHeight: 512,
        minWidth: 512,
        webPreferences: _webPreferences,
        titleBarStyle: "hidden", 
        resizable: false
    });

    loading.loadFile(path.resolve(__dirname, "..", "assets/loading.html"));
    loading.show(); 
     
    loading.on("ready-to-show", () => {
        main = new BrowserWindow({
            width: 1000,
            height: 600,
            minWidth: 1000,
            minHeight: 600,
            webPreferences: {
                preload: path.resolve(__dirname, "render.js"),
                ..._webPreferences
            },
            backgroundColor: "#121212",
            center: true,
            titleBarStyle: 'hidden',
            titleBarOverlay: { 
                color: "rgba(18, 18, 18, 1)",
                symbolColor: "rgba(255, 255, 255, 1)",
                height: 40
            }
        });

        main.loadFile(path.resolve(__dirname, "..", "deps/app/build/index.html"));

        main.webContents.once("dom-ready", () => { 
            loading.hide();
            loading.close();

            main.show();  
            
            main.webContents.on("before-input-event", (event, input) => {
                if (input.key == "F12") {
                    toggleDevTools();
                }
            });

            ipcMain.handle("create-session", async (event, ...args) => {
                console.log(args);
                return {};
            });
        
        });

    });
}

app.whenReady().then(() => {
    create();
  
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            create();
        } else {
            app.show();
        }
    })
});
  
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});