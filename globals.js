import colors from "colors";

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
