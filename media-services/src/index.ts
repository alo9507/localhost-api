import upload from './aws/upload';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config({ path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`) });
const app = express();
app.use(cors());

app.post('/media/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    res.json(req.file);
  } else throw 'error';
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
