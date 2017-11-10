const electron = require('electron');
const {app, BrowserWindow} = electron;

const path = require('path');
const url = require('url');

let win;

createWindow = (width, height, view) => {
    w = new BrowserWindow({
        width: width,
        height: height
    })
    w.loadURL(url.format({
        pathname: path.join(__dirname, `views/${view}`),
        protocol: 'file',
        slashed: true
    }))

    return w;
}

app.on('ready', () => {
    win = createWindow(800, 600, "index.html");
});