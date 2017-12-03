const electron = require('electron');
const {app, BrowserWindow, ipcMain, ipcRenderer, Menu, MenuItem, dialog} = electron;

let mainWindow;
var grid;


app.on('ready', () => {
    mainWindow = new BrowserWindow();
    Menu.setApplicationMenu(null);
    mainWindow.loadURL(`file://${__dirname}/upload.html`);
});

ipcMain.on('FILE_DROPPED', (event, text) => {
    toGrid(text);
    sanitizeGrid();
    mainWindow.loadURL(`file://${__dirname}/befunge.html`);
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
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

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Load Funge',
                click() {
                    mainWindow = new BrowserWindow();
                    mainWindow.loadURL(`file://${__dirname}/upload.html`);
                }
            },
            {
                label: 'Load Specs',
                submenu: [
                    {
                        label: 'Load New Specs',
                        click() {
                            var path = dialog.showOpenDialog({properties: ['openFile']});
                            mainWindow.webContents.send('CHANGE_SPECS', path, true);
                        }
                    },
                    {
                        label: 'Befunge 93',
                        click() {
                            mainWindow.webContents.send('CHANGE_SPECS', "./config/befunge93.js", false);
                        }
                    }
                ]
            }
        ]
    }
];

// Account for macOS automatically subsuming first menu item
if (process.platform === 'darwin') {
    menuTemplate.unshift({});
}

// Reenable dev tools if not in prod
if (process.env.NODE_ENV !== 'production') {
    menuTemplate.push({
        label: 'Developer',
        submenu: [
            {role: 'reload'},
            {
                label: 'Toggle Developer Tools',
                accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });
}

ipcMain.on('SEND_TITLE', (event, path, title) => {
    console.log(event);
    menuTemplate[0].submenu[1].submenu.push({
        label: `${title}`,
        click() {
            mainWindow.webContents.send('CHANGE_SPECS', `${path}`, false);
        }
    })
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});
