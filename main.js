const electron = require('electron');
const {app, BrowserWindow} = electron;

const path = require('path');
const url = require('url');

let win;

exports.createWindow = (width, height, view, debug) => {
    var win = new BrowserWindow({
        width: width,
        height: height
    });
    
    if (view != undefined) {
        win.loadURL(url.format({
            pathname: path.join(__dirname, `views/${view}.html`),
            protocol: 'file',
            slashed: true
        }));
    }

    if (debug) win.webContents.openDevTools();
    
    return win;
}

app.on('ready', () => {
    exports.createWindow(800, 600, "index", true);
});