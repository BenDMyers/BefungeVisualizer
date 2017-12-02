funge.title = "Befunge-93";

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
        default:
            break;
    }
}
