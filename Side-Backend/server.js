const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(express.json())

const port = process.env.PORT || 3333

const router = require('./routes/routes')

app.use('/', router)

mongoose.connect("mongodb+srv://danielson7632:lLGJDM1eqkYxMJSm@indodit.xvqhxtv.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Indodit")
.then(()=>{
    console.log("Connected to Database")
    app.listen(port, ()=>{
        console.log(`Node.js HTTP server is running on port ${port}`)
    })
})
.catch(()=>{
    console.log("Connection Failed")
})