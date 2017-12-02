const electron = require('electron');
const {app, BrowserWindow, ipcMain} = electron;

let mainWindow;
var grid;

app.on('ready', () => {
    mainWindow = new BrowserWindow();
    mainWindow.loadURL(`file://${__dirname}/upload.html`);
});

ipcMain.on('FILE_DROPPED', (event, text) => {
    toGrid(text);
});

// Converts a multiline string to a 2D array grid
function toGrid(contents) {
    grid = contents.split(/[\n|\r]+/);
    var len = 0;
    for (var i = 0; i < grid.length; i++) {
        grid[i] = grid[i].split('');
        len = Math.max(len, grid[i].length);
    }
    for (var i = 0; i < grid.length; i++) {
        while(grid[i].length < len) {
            grid[i].push(' ');
        }
    }
}
