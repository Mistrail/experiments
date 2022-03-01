import {} from '../globals.js'
import models from "../database/models.js";
import Connection from '../database/connection.js'
const total = Object.entries(models).length;
const moduleNames = Object.keys(models);
let counter = 0;
const force = true;

function showProgress(total, counter){
    const placeHolders = "_".repeat(total - counter)
    const done = "#".repeat(counter);
    process.stdout.write(`\r[${done}${placeHolders}]`);
}

(async () => {
    if(force){
        await Connection.query("SET FOREIGN_KEY_CHECKS = 0");
    }
    for (const modelName of moduleNames) {
        try {
            await models[modelName].sync({alter: !force, force});
            showProgress(total, ++counter);
        }catch (err){
            e(err);
        }
    }
    if(force){
        await Connection.query("SET FOREIGN_KEY_CHECKS = 1");
    }
})().then(() => {
    d("\n", "Install complete");
    process.exit(0);
})

