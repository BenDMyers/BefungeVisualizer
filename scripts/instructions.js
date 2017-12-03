// COMMON FUNCTIONS THAT WILL LIKELY BE IMPLEMENTED IN ALL FUNGEOIDS

function up() {funge.direction = "up";}
function down() {funge.direction = "down";}
function left() {funge.direction = "left";}
function right() {funge.direction = "right";}
function northeast() {funge.direction = "northeast";}
function northwest() {funge.direction = "northwest";}
function southeast() {funge.direction = "southeast";}
function southwest() {funge.direction = "southwest";}

function move() {
    switch (funge.direction) {
        case "up":
            funge.r = (funge.r - 1) % funge.grid.length;
            break;
        case "down":
            funge.r = (funge.r + 1) % funge.grid.length;
            break;
        case "left":
            funge.c = (funge.c - 1) % funge.grid[0].length;
            break;
        case "right":
            funge.c = (funge.c + 1) % funge.grid[0].length;
            break;
        case "northeast":
            funge.r = (funge.r - 1) % funge.grid.length;
            funge.c = (funge.c + 1) % funge.grid[0].length;
            break;
        case "northwest":
            funge.r = (funge.r - 1) % funge.grid.length;
            funge.c = (funge.c - 1) % funge.grid[0].length;
            break;
        case "southeast":
            funge.r = (funge.r + 1) % funge.grid.length;
            funge.c = (funge.c + 1) % funge.grid[0].length;
            break;
        case "southwest":
            funge.r = (funge.r + 1) % funge.grid.length;
            funge.c = (funge.c - 1) % funge.grid[0].length;
            break;
        default:

    }
}

function output(out) {
    document.getElementById('output').textContent += out;
    console.log(out);
}
