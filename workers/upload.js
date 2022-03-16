import Queue from 'bull';

export const uploadQueue = new Queue('upload-files');

uploadQueue.process((job, done) => {
    done(null, job.data);
})

export function upload(file){
    uploadQueue.add(file);
}

