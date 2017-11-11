const electron = require('electron');
const {app, BrowserWindow} = electron;

const path = require('path');
const url = require('url');

/**
 * Main frame.
 */
let win;

/**
 * Create a new window.
 * 
 * @param {int} width 
 * @param {int} height 
 * @param {string} view 
 * @param {boolean} debug 
 */
exports.createWindow = (width, height, view, debug) => {
    var win = new BrowserWindow({
        minWidth: width,
        width: width,
        minHeight: height,
        height: height,
        // frame: false,
        titleBarStyle: 'hiddenInset',
        resizable: true,
        show: false,
        backgroundColor: ''
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

/**
 * Once the application is fully loaded, the index frame is executed.
 */
app.on('ready', () => {
    win = exports.createWindow(1000, 600, 'index', true);
    win.show();
});

/**
 * The window is shown as soos as it's fully loaded.
 */
app.once('ready-to-show', () => {
})