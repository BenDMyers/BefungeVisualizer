var table;
var stepButton;
var runButton;
var stopButton;
var windowReady = false;
var runner;

funge = {};
funge.r = 0;
funge.c = 0;
funge.stringMode = false;
funge.direction = "right";

window.onload = function () {
    windowReady = true;
    table = document.getElementById('grid');
    stepButton = document.getElementById('step-button');
    runButton = document.getElementById('run-button');
    stopButton = document.getElementById('stop-button');
    stopButton.style.display = "none";
}

function gridToTable(grid) {
    funge.grid = grid;
    table = document.createElement('table');
    table.setAttribute('class', 'funge');
    var tb = document.createElement('tbody');

    for (var r = 0; r < grid.length; r++) {
        var row = document.createElement('tr');
        for (var c = 0; c < grid[r].length; c++) {
            var cell = document.createElement('td');
            cell.innerHTML = grid[r][c];
            cell.setAttribute('id', `${r}-${c}`);
            row.appendChild(cell);
        }
        tb.appendChild(row);
    }

    table.appendChild(tb);
    document.getElementById('grid').replaceWith(table);
}

function step() {
    // Clear current cell
    document.getElementById(`${funge.r}-${funge.c}`).className = '';
    funge.c = (funge.c + 1) % funge.grid[0].length;
    document.getElementById(`${funge.r}-${funge.c}`).className = 'active-cell';
}

function click_run() {
    stepButton.style.display = "none";
    runButton.style.display = "none";
    stopButton.style.display = "inline";
    runner = setInterval(step, 250);
}

function click_stop() {
    clearInterval(runner);
    stepButton.style.display = "inline";
    stopButton.style.display = "none";
    runButton.style.display = "inline";
}
