import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import errorHandler from './middleware/errorHandler';
import mongoose from 'mongoose';
import cors from 'cors';


const app = express();

app.use(cors())
app.use(express.json());
dotenv.config();

const port = process.env.PORT || 8000;
app.use('/api', routes);

// mongoDB connection
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('suceesfully connected');
}).catch((err) => {
    console.log(err)
    console.log('error in Data Base connection')
})

app.use(errorHandler);
app.listen(port, () => {
    console.log(`Listining on port ${port}`);
})