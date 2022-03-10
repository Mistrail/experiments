import {} from '../globals.js';
import {parentPort, Worker, isMainThread} from 'worker_threads';

if(!isMainThread){
    parentPort.on('message', (data) => {
        parentPort.postMessage(data)
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
    postMessage(message){
        this.worker.postMessage(message);
    }
}
