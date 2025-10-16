import { config, configDotenv } from "dotenv";
configDotenv()
import express from "express";
import { cloudinary_api_key, cloudinary_api_secret, cloudinary_name, mongodbURI } from "./src/config/conf.js";
import cors from 'cors';
import mongoose from "mongoose";
import { port } from "./src/config/conf.js";

const app = express();
// {
//   origin: "http://localhost:5174",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }
const corsOptions = {
    origin: [
        'https://pmc-barter.vercel.app/',
        "https://barter-dashboard958045vflnvkf4593405vjcgbf.vercel.app/"
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies to be sent
    optionsSuccessStatus: 204 // For preflight requests
};

app.use(cors(corsOptions))

app.use(express.json());

mongoose.connect(mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log(`Mongodb uri : ${mongodbURI}`);
        console.log("Mongodb conneced");
    })
    .catch((err) => {
        console.log(`Mongodb uri : ${mongodbURI}`);
        console.log(err);
    })

app.listen(port || 5000, () => {
    console.log(`Server running at port = ${port}`);
})

app.get('/', (req, res) => {
    console.log(
        "hello",
    );

    res.json({
        message: "Hello",
        statusCode: 200
    })
})


import barterRouter from "./src/routes/barter.routes.js";

app.use('/api/barter/v1', barterRouter);

import uploadRouter from "./src/routes/upload.routes.js";

app.use('/api/upload/v1', uploadRouter)

import pageRouter from './src/routes/pages.routes.js'

app.use('/api/page/v1', pageRouter)