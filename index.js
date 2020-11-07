//modules
require('dotenv').config()
const express = require('express')
const mongoose  = require('mongoose')
const app = express()
const cors = require('cors')

app.use(cors());
//variable
const uRoute = require('./routes/userRoute')

const corsOptions = {
    origin: true,
    credetials: true,
    optionsSuccessStatus: 204
}


//database connection
const dbLink= process.env.dbWebsite

mongoose.connect(dbLink, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => {
    app.listen(4000, () => {
        console.log('The Server is running and Database is connected')
})


})

//middlewares
app.use(express.json())
app.use(cors(corsOptions))


//routes
app.use('/',uRoute)


//error messages