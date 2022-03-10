import {} from '../globals.js';
import {parentPort, Worker, isMainThread} from 'worker_threads';
import fs from 'fs';

if(!isMainThread){
    parentPort.on('message', (data) => {
        const targetFilename = `${data.file.filename}.${data.file.originalname.split(/\./).pop()}`;
        fs.copyFileSync(data.file.path, `./upload/${targetFilename}`);
        parentPort.postMessage({file: {...data.file, filename: targetFilename}, body: data.body});
    })
}

export class UploadWorker{

    static WORKER_FILENAME = './workers/upload.js';

    constructor(data = null) {
        this.worker = new Worker(UploadWorker.WORKER_FILENAME, {workerData: data});
    }

    listen(){
        this.worker.on('message', () => {});
        this.worker.on('error', (e) => {
            throw e
        });
        this.worker.on('exit', (code) => {
            if (code !== 0)
                throw new Error(`stopped with  ${code} exit code`);
        })
    }
    upload(data){
        this.worker.postMessage(data);
    }

    onEnd(cb){
        this.worker.once('message', cb)
    }

}
