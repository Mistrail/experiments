import {} from '../globals.js';
import {parentPort, Worker, isMainThread} from 'worker_threads';

if(!isMainThread){
    parentPort.on('message', (data) => {
        const files = [];
        // @todo queue file processing
        data.files.forEach(file => {
            files.push(file);
        })
        parentPort.postMessage({files});
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

    onProgress(cb){
        this.worker.on('message', cb)
    }

    onEnd(cb){
        this.worker.once('message', cb)
    }

}
