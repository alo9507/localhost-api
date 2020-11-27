
import upload from "./aws/upload";
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`) });

import express from "express";
const app = express();
const http = require('http').Server(app);

app.post('/upload', upload.single('photo'), (req, res, next) => {
    res.json(req.file);
});

let port = process.env.PORT || 3000;
http.listen(port, () => {
    console.log(`Listening on port ${port}`);
});