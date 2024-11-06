import express from 'express';
import mongoose from 'mongoose';
import { init } from './src/services/post';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

init()


app.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`);
});
