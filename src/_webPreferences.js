module.exports = {
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