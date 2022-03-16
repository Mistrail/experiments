import express from 'express'
import bodyParser from 'body-parser';
import multer from 'multer';
import {uploadQueue, upload} from '../workers/upload.js'
import getTokenData from "./getTokenData.js";
import {Context} from "./context.js";
import pubsub from './pubsub.js'
const MAX_UPLOAD_COUNT = 10;
const multerUpload = multer({dest: "temp"});
const app = express();
import {UPLOAD} from '../config/pubsubTrigger.js';

app.use(bodyParser.json());
app.context = new Context;

app.use((req, res, next) => {
    app.context.bind(getTokenData(req.headers.authorization));
    next();
})

app.post('/upload', multerUpload.array('upload', MAX_UPLOAD_COUNT), async (req, res) => {
    if(!app.context.data.isAuth) {
        res.sendStatus(401);
        return;
    }
    req.files.forEach(upload);
    uploadQueue.on('completed', (job, result) => {
        pubsub.publish(UPLOAD(app.context.data.user.userID), {system: [JSON.stringify(result)]});
        res.sendStatus(200);
    })
    upload.on('error', (err) => {
        res.sendStatus(500);
    })
})

app.use((req, res) => {
    res.sendStatus(404);
})

export default async function () {
    app.listen(process.env.EXPRESS_PORT);
    return app;
};
