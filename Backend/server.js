const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

app.use(express.json({limit:'50mb'}))

app.use(express.urlencoded({ extended: false }))

app.use(cors())

app.use(cookieParser())

const port = process.env.PORT || 3333

const router = require('./routes/routes')

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', router)

mongoose.connect(process.env.MONGO_DB_CONNECTION)
    .then(() => {
        console.log("Connected to Database")
        app.listen(port, () => {
            console.log(`Node.js HTTP server is running on port ${port}`)
        })
    })
    .catch((err) => {
        console.log("Connection Failed")
        console.log(err)
    })