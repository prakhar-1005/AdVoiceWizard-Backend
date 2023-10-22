const express = require('express')
const cors = require('cors')
const searchRoutes = require('./routes/searchRoutes')

const app =express()

app.use(cors())
app.use(express.json())

app.use('/',searchRoutes)

app.listen(4000, ()=>{
    console.log("server is running on port 4000");
})