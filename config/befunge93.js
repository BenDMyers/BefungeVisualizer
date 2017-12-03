funge.title = "Befunge-93";
funge.path = "./config/befunge93.js";


function process(instr) {
    if(instr == "&quot;" || instr == '"') {
        funge.stringMode = !funge.stringMode;
        return;
    }
    if(funge.stringMode) {
        funge.stack.push(funge.grid[funge.r][funge.c].charCodeAt(0));
        console.log(funge.grid[funge.r][funge.c].charCodeAt(0));
        return;
    }
    switch (instr) {
        case '&nbsp;': // NO-OP
            break;
        case '&gt;':
            right();
            break;
        case '<':
            left();
            break;
        case '^':
            up();
            break;
        case 'v':
            down();
            break;
        case ',':
            output(String.fromCharCode(funge.stack.pop()));
            break;
        case '@':
            document.getElementById(`${funge.r}-${funge.c}`).className = '';
            funge.r = -1;
            funge.c = -1;
            funge.direction = "right";
            if(funge.runner) {click_stop();}
        default:
            break;
    }
}
