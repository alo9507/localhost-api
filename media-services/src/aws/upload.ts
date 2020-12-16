import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

const s3 = new aws.S3({
  accessKeyId: "AKIAT7GXCJGUXATR2IV6",
  secretAccessKey: "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",
  region: 'us-east-2'
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'localhostusers',
    acl: 'public-read',
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      cb(null, Date.now().toString() + '.png');
    }
  })
});

export default upload;
