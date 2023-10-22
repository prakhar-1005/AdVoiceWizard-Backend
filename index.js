require("dotenv").config();
const express = require('express')
const cors = require('cors')
const searchRoutes = require('./routes/searchRoutes')


const PORT = process.env.PORT || 4000;

const app =express()

app.use(cors())
app.use(express.json())

app.use('/',searchRoutes)

app.listen(PORT, ()=>{
    console.log("server is running on port 4000");
})