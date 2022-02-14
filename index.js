import globals from './globals.js'
import apollo from "./environment/apollo.js";
import app from "./environment/app.js";

apollo().then((apolloInstance) => {
    d(`Apollo started on ${apolloInstance.url}`)
}).catch(e);

app().then(() => {
    d(`Express started on http://localhost:${process.env.EXPRESS_PORT}`);
}).catch(e);
