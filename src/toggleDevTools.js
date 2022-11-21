module.exports = function toggleDevTools() {
    if (!main.webContents.isDevToolsOpened()) {
        main.webContents.openDevTools();
    } else {
        main.webContents.closeDevTools();
    }
}