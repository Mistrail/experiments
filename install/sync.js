import globals from '../globals.js'
import models from "../database/models.js";
const total = Object.entries(models).length;
let counter = 0;

function showProgress(total, counter){
    const placeHolders = "_".repeat(total - counter)
    const done = "#".repeat(counter);
    process.stdout.write(`[${done}${placeHolders}]`);
}

(async () => {
    for (const modelName in models) {
        try {
            await models[modelName].sync({alter: true});
            showProgress(total, ++counter);
        }catch (err){
            e(err);
        }

    }
})().then(() => {
    d("\nInstall complete");
    process.exit(0)
})

