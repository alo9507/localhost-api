import upload from './aws/upload';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`) });

const app = express();

app.post('/upload', upload.single('photo'), (req, res) => {
  res.json(req.file);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
