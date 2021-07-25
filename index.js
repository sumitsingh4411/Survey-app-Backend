import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import errorHandler from './middleware/errorHandler';
import mongoose from 'mongoose';




const app = express();
app.use(express.json());
dotenv.config();
const port = process.env.App_PORT || 8000;
app.use('/api', routes);

// mongoDB connection
mongoose.connect(process.env.DB_URL, {
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