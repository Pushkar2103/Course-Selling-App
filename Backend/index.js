import express from 'express';
import {PORT, dbConnectionString} from './env.js'
import userRouter from './routes/user-route.js'
import adminRouter from './routes/admin-route.js'
import mongoose from "mongoose";

async function connectionToDB() {
    try {
        await mongoose.connect(dbConnectionString);
    }
    catch(e) {
        console.log('Failed to connect to db');
    }
}
connectionToDB();

const app = express();
app.use(express.json());

app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.listen(PORT, ()=>{
    console.log(`Server started at http://localhost:${PORT}/`);
});