import colors from "colors";
import dotenv from "dotenv";
dotenv.config();

global.d = (...args) => {
    if(/^\n/.test(args[0])){
        process.stdout.write('\n');
    }
    console.log('DEBUG: '.cyan, ...args)
};

global.e = (...args) => {
    if(/^\n/.test(args[0])){
        process.stdout.write('\n');
    }
    console.log('ERROR: '.red, ...args)
};

export default 'globals'
