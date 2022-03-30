import '../globals.js';
import {Worker, isMainThread, workerData, parentPort} from 'worker_threads';

if(!isMainThread){
    parentPort.on('message', (workerData) => {
        // @todo process & move uploaded files
        parentPort.postMessage({state: 'start', workerData})
    })
}

export default function runUploader(){
    const worker = new Worker('./uploader/worker.js');
    worker.upload = (file, context) => {
        worker.postMessage({file, context})
    }
    return worker;
}
