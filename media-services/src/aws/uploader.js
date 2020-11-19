const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey
});

const uploadFile = async (file, userId) => {
    let promise = new Promise((resolve, reject) => {
        const params = {
            Bucket: "localhostusers",
            Key: userId,
            Body: fileContent
        };

        s3.upload(params, function (err, data) {
            if (err) {
                throw err;
            }
            console.log(`File uploaded successfully. ${data.Location}`);
            resolve(data.Location);
        });
    });
    return promise;
};

export default uploadFile;