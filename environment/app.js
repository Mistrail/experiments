import express from 'express'
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import multer from 'multer';

const app = express();
const upload = multer({dest: "temp"});

app.use(bodyParser.json());
app.post('/upload', upload.single('upload'), (req, res) => {
    res.sendStatus(200);
})
app.use((req, res) => {
    res.sendStatus(404);
})


export default async function () {
    app.listen(process.env.EXPRESS_PORT);
    return app;
};
