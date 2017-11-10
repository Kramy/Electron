const electron = require('electron');
const {app, BrowserWindow} = electron;

const path = require('path');
const url = require('url');

let win;

app.on('ready', () => {
    win = new BrowserWindow({
        width: 500,
        height: 400
    })
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashed: true
    }))
});