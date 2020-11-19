import express from "express";
import uploadFile from "./aws/uploader";
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`) });

const express = require('express');
const app = express();
const port = 3000;

app.post('/uploadImage', (req, res) => {
    const imageUrl = await uploadFile(req.data);
    res.send(imageUrl);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});