const electron = require("electron");
const path = require("path");
const updater = require("./updater");
const _defaultOptionsLoader = require("./_defaultOptionsLoader"); 

if (typeof(electron) == "string") {
    process.exit(-1);
}

const {
    app,
    BrowserWindow,
    Menu
} = electron;

Menu.setApplicationMenu(null); 
 
function initApp() {
    const loading = new BrowserWindow(_defaultOptionsLoader);

    loading.loadFile(path.resolve(__dirname, "..", "assets/loading.html"));
    loading.show(); 
     
    loading.on("ready-to-show", () => {
        updater({
            init: require("./bootstrap"),
            handlerUpdaterEnd() {
                loading.hide();
                loading.close();
            }
        }); 
    });
}

app.whenReady().then(() => { 
    const singleInstanceLock = app.requestSingleInstanceLock();
    if (!singleInstanceLock) { 
        app.quit();
    } else { 
        app.on("second-instance", (event, argv, working, data) => {
            const [win] = BrowserWindow.getAllWindows();
            win.show();
        });
    }
    initApp();
});

app.on("window-all-closed", () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});