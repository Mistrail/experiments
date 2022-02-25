import colors from "colors";
import dotenv from "dotenv";
dotenv.config();

global.d = (...args) => {
    let px = ''
    if(args[0] === "\n"){
        px = '\n'
        args.shift()
    }
    console.log(`${px}DEBUG: `.cyan, ...args);
};

global.e = (...args) => {
    let px = ''
    if(args[0] === "\n"){
        px = '\n'
        args.shift()
    }
    console.log(`${px}ERROR: `.red, ...args);
};

export default 'globals'
