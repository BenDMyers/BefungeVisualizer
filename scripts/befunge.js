var table;

window.onload = function() {
    table = document.getElementById('grid');
}

function gridToTable(grid) {
    table = document.createElement('table');
    table.setAttribute('class', 'funge');
    var tb = document.createElement('tbody');

    for (var r = 0; r < grid.length; r++) {
        var row = document.createElement('tr');
        for (var c = 0; c < grid[r].length; c++) {
            var cell = document.createElement('td');
            cell.innerHTML = grid[r][c];
            cell.setAttribute('id', `${r}_${c}`);
            row.appendChild(cell);
        }
        tb.appendChild(row);
    }

    table.appendChild(tb);
    document.getElementById('grid').replaceWith(table);
}
