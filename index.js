const electron = require('electron');
const {app, BrowserWindow, ipcMain} = electron;

let mainWindow;

window.onload = function() {
    var dropZone = document.getElementById('drop-zone');
    var h = document.getElementById('h');
    var i = document.getElementById('upload-icon');
    dropZone.ondrop = function(e) {
        e.preventDefault();
        this.className = 'upload-drop-zone vertical-align';
        h.className = '';
        i.className = "fa fa-upload";
        console.log(e.dataTransfer.files);
    }

    dropZone.ondragover = function() {
        this.className = 'upload-drop-zone drop vertical-align';
        h.className = 'green-text';
        i.className = "fa fa-upload green-text";
        return false;
    }

    dropZone.ondragleave = function() {
        this.className = 'upload-drop-zone vertical-align';
        h.className = '';
        i.className = 'fa fa-upload'
        return false;
    }
}

app.on('ready', () => {
    mainWindow = new BrowserWindow();
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});
