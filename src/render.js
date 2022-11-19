const electron = require("electron");  

electron.contextBridge.exposeInMainWorld("VKPreviewToken", {
    createSession(...args) {
        return electron.ipcRenderer.invoke("create-session", ...args);
    },
    listSavesSessions(...args) {
        return electron.ipcRenderer.invoke("list-saves-sessions", ...args);
    },
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
});