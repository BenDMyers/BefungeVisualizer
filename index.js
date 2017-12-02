const electron = require('electron');
const {app, BrowserWindow, ipcMain, ipcRenderer} = electron;

let mainWindow;
var grid;

app.on('ready', () => {
    mainWindow = new BrowserWindow();
    mainWindow.loadURL(`file://${__dirname}/upload.html`);
});

ipcMain.on('FILE_DROPPED', (event, text) => {
    toGrid(text);
    sanitizeGrid();
    mainWindow.loadURL(`file://${__dirname}/befunge.html`);
    mainWindow.webContents.on('did-finish-load', function() {
 	      mainWindow.webContents.send('RECEIVE_GRID', grid);
      });
});

// Replaces HTML-unsafe characters with HTML escape characters
function sanitizeGrid() {
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid.length; j++) {
            switch (grid[i][j]) {
                case ' ':
                    grid[i][j] = '&nbsp;'
                    break;
                case '<':
                    grid[i][j] = '&lt;'
                    break;
                case '>':
                    grid[i][j] = '&gt;'
                    break;
                case '&':
                    grid[i][j] = '&amp;'
                    break;
                case '"':
                    grid[i][j] = '&quot;'
                    break;
                case "'":
                    grid[i][j] = '&#39;'
                    break;
                default:

            }
        }
    }
}

// Converts a multiline string to a 2D array grid
function toGrid(contents) {
    grid = contents.split(/[\n|\r]+/);
    var len = 0;
    for (var i = 0; i < grid.length; i++) {
        grid[i] = grid[i].split('');
        len = Math.max(len, grid[i].length);
    }
    while(grid[grid.length - 1] == '') {
        grid.pop();
    }
    for (var i = 0; i < grid.length; i++) {
        while(grid[i].length < len) {
            grid[i].push(' ');
        }
    }
}
