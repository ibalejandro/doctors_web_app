import axios from 'axios';

const UPLOAD_TO_S3_URL = process.env.REACT_APP_UPLOAD_TO_S3_API_URL;

class UploadToS3API {
    static async getUploadUrl(filename) {
        const getUrl = (filename) => {
            return new Promise((res, rej) => {
                let req = new XMLHttpRequest()
                req.open("POST", UPLOAD_TO_S3_URL)
                req.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
                req.send(JSON.stringify({ filename: filename }))
                req.onload = () => {
                    res(JSON.parse(req.responseText))
                }
                req.onerror = (err) => {
                    console.log('error getting file url', err)
                }
            })
        }
        const resp = await getUrl(filename)
        return resp
    }

    static async uploadMedia(file, progressCallback) {
        const onProgress = (e) => {
            if(e.lengthComputable) {
                const percent = Math.round((e.loaded / e.total) * 100);
                // progressCallback(percent);
            }
        }

        const data = new FormData();

        const s3Params = await this.getUploadUrl(file.name)

        Object.keys(s3Params.fields).forEach(key=>{
            data.set(key, s3Params.fields[key])
        })

        // IMPORTANT! Aws s3 ignores all keys after the file key so this should be after all params are set
        data.append('file', file);

        let upload = {}

        try {
            upload = await axios({
                url: s3Params.url,
                method: 'POST',
                data: data,
                onUploadProgress: onProgress
            })
            return {
                media: {
                    bucket: s3Params.fields.bucket,
                    key: s3Params.fields.key
                }
            };
        } catch(err) {
            console.log(err)
            return {
                media: null
            };
        }
    }
}

export default UploadToS3API;