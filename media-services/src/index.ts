import upload from './aws/upload';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config({ path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`) });

const app = express();
app.use(cors())

app.post('/media/upload', upload.array('photo'), (req, res) => {
  res.send("Uploaded!")
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
