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

function create() {
    const loading = new BrowserWindow({ 
        center: true,
        backgroundColor: "#121212",
        width: 512,
        height: 512,
        minHeight: 512,
        minWidth: 512,
        webPreferences: {
            contextIsolation: true
        },
        titleBarStyle: "hidden", 
        resizable: false
    });

    loading.loadFile(path.resolve(__dirname, "..", "assets/loading.html"));
    loading.show(); 
     
    loading.on("ready-to-show", () => {
        const main = new BrowserWindow({
            width: 1000,
            height: 600,
            minWidth: 1000,
            minHeight: 600,
            webPreferences: {
                preload: path.join(__dirname, "render.js"),
                contextIsolation: true
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
        }
    })
});
  
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});