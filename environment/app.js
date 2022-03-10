import express from 'express'
import bodyParser from 'body-parser';
import multer from 'multer';
import {UploadWorker} from '../workers/upload.js'
import getTokenData from "./getTokenData.js";
import {Context} from "./context.js";
import fs from "fs";
const MAX_UPLOAD_COUNT = 10;
const uploader = new UploadWorker();
const upload = multer({dest: "temp"});
const app = express();

app.use(bodyParser.json());
app.context = new Context;

app.use((req, res, next) => {
    app.context.bind(getTokenData(req.headers.authorization));
    next();
})

app.post('/upload', upload.array('upload', MAX_UPLOAD_COUNT), async (req, res) => {
    uploader.upload({files: req.files, body: req.body});
    res.setHeader('Content-Type', 'application/json');
    uploader.onEnd((data) => {
        data.files.forEach(file => {
            fs.unlinkSync(file.path);
        });
        res.send(data);
    });

})

app.use((req, res) => {
    res.sendStatus(404);
})

uploader.listen();

export default async function () {
    app.listen(process.env.EXPRESS_PORT);
    return app;
};
