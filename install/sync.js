import globals from '../globals.js'
import models from "../database/models.js";
const total = Object.entries(models).length;
const moduleNames = Object.keys(models);
let counter = 0;

function showProgress(total, counter){
    const placheHolders = "_".repeat(total - counter)
    const done = "#".repeat(counter);
    process.stdout.write(`\r[${done}${placheHolders}]`);
}

(async () => {
    for (const modelName of moduleNames) {
        try {
            await models[modelName].sync({alter: true});
            showProgress(total, ++counter);
        }catch (err){
            e(err);
        }
    }
})().then(() => {
    d("\n", "Install complete");
    process.exit(0);
})

