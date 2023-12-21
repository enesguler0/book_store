import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';

const app = express();

app.use(express.json());

//Middleware for handling CORS Policy
//option 1: Allow all origins with default of cors(*)
app.use(cors());
//option 2: Allow custom origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET','POST','PUT', 'DELETE'],
//         allowedHeaders:['Content-Type'],
//     })
// ) 

app.get('/', (req, res)=>{
    console.log(req)
    return res.status(234).send('Welcome')
});

app.use('/books',booksRoute);





mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App connected to database')
        app.listen(PORT, ()=>{
            console.log(`App listening ${PORT}`);
        })
    })
    .catch((error)=>{
        console.log(error)
    })

