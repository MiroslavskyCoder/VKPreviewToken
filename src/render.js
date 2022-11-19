const electron = require("electron");  

electron.contextBridge.exposeInMainWorld("VKPreviewToken", {
    createSession(...args) {
        return electron.ipcRenderer.invoke("create-session", ...args);
    },
    listSavesSessions(...args) {
        return electron.ipcRenderer.invoke("list-saves-sessions", ...args);
    },
    isActiveSession(...args) {
        return electron.ipcRenderer.invoke("is-active-session", ...args);
    },
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
    isDev() {
        return process.argv.includes("--dev");
    }
});