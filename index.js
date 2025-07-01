const express = require('express');
const mongoose = require('mongoose');
const app = express();
const config = require('./src/config');
const authRouter = require('./src/routes/routes');
require('dotenv').config();

const MONGODB = config.MONGODB;

// rest api's req and res => json format

// global level middleware
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected mongoDB successfully'));


// "/" -> endPoint
// app.post("/", (req, res) => {
//     let body = req.body;
//     return res.send(body);
// })

app.use('/auth', authRouter);

const port = config.port ?? 4000

app.listen(port, () => console.log(`express is running on port ${port}`));