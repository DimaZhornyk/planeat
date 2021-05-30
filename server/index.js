import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
import getMongoURI from "./config/config.js";

dotenv.config();

mongoose.connect(
    getMongoURI(process.env.MONGO_USERNAME, process.env.MONGO_PASSWORD),
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

    mongoose.connection.on('open', function (ref) {
        console.log('Connected to mongo server.');
        //trying to get collection names
        mongoose.connection.db.listCollections().toArray(function (err, names) {
            console.log(names); // [{ name: 'dbname.myCollection' }]
        });
    })

const app = express();

app.listen(3000, () =>
    console.log('Example app listening on port 3000!'),
);





