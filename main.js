const electron = require('electron');
const {app, BrowserWindow} = electron;

const path = require('path');
const url = require('url');

let win;

createWindow = (width, height, view, debug) => {
    var win = new BrowserWindow({
        width: width,
        height: height
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, `views/${view}.html`),
        protocol: 'file',
        slashed: true
    }));

    if (debug) win.webContents.openDevTools();
    
    return win;
}

app.on('ready', () => {
    createWindow(800, 600, "index", true);
});