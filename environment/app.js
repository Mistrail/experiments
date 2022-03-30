import express from 'express'
import { UPLOAD } from '../config/settings.js'
import bodyParser from 'body-parser';
import multer from 'multer';
import getTokenData from "./getTokenData.js";
import {Context} from "./context.js";
import runUploader from '../uploader/worker.js';
import {v4 as uuidv4} from 'uuid';
const multerUpload = multer({dest: UPLOAD.TMP});
const app = express();

app.use(bodyParser.json());
app.context = new Context();
const uploader = runUploader();

app.use((req, res, next) => {
    app.context.bind(getTokenData(req.headers.authorization));
    next();
})

app.post('/upload', multerUpload.array(UPLOAD.FIELD_NAME, UPLOAD.MAX_UPLOAD_COUNT), async (req, res) => {
    if (!app.context.isAuth) {
        res.status(401);
    }
    req.files.forEach(file => {
        uploader.upload({file, ...req.body}, app.context);
    })

    uploader.on('message', (data) => {
        d(`@todo Send data by pubsub to current user personal channel {USER:${app.context.user.userID}: ...}`)
        // @todo Send data by pubsub to current user personal channel
    })

    res.send({action: 'upload', state: 'start', count: req.files.length, seed: req.body.seed || null})
})

app.use((req, res) => {
    res.status(404).send('Not found');
})

export default async function () {
    app.listen(process.env.EXPRESS_PORT);
    return app;
};
