import express from 'express'
import bodyParser from 'body-parser';
import multer from 'multer';
import {UploadWorker} from '../workers/upload.js'
import getTokenData from "./getTokenData.js";
import {Context} from "./context.js";
const uploader = new UploadWorker();
const upload = multer({dest: "temp"});
const app = express();

app.use(bodyParser.json());
app.context = new Context;

app.use((req, res, next) => {
    app.context.bind(getTokenData(req.headers.authorization));
    next();
})

app.post('/upload', upload.single('upload'), async (req, res) => {
    uploader.postMessage({file: req.file, body: req.body});
    uploader.worker.on("message", d);
    res.sendStatus(200);
})

app.use((req, res) => {
    res.sendStatus(404);
})

uploader.listen();

export default async function () {
    app.listen(process.env.EXPRESS_PORT);
    return app;
};
