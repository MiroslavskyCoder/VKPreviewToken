const electron = require("electron"); 
const minimist = require("minimist");
const jquery = require("jquery");
const events = require("events");

const _parseArgs = () => {
    return minimist(process.argv, { "--": true });
}

class vkpt extends events.EventEmitter
{
    constructor() 
    {
        super(); 

        this.args = _parseArgs();

        jquery(window).ready(($) => {

            this.isReady = this;
            this.emit("ready", this);
            
        });
    }

}

electron.contextBridge.exposeInMainWorld(
    "vkpt",
    new vkpt()
);