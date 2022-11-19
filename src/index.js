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
    const win = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "render.js"),
            contextIsolation: true
        },
        backgroundColor: "#121212",
        center: true,
        frame: false
    }); 
    win.webContents.openDevTools();
    win.loadFile(path.resolve(__dirname, "..", "deps/app/build/index.html"));

    ipcMain.handle("create-session", async (event, ...args) => {
        console.log(args);
        return {};
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
        app.quit()
    }
});