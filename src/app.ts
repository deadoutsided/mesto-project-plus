import express from 'express';
import mongoose from 'mongoose';
import rootRouter from './routes/index';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.use('/', rootRouter);

app.listen(PORT, () => {
});
