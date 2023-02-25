const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express();

const port = 5001  || process.env.PORT;

const staticPath = path.join(__dirname,"../public")

app.use(express.static(staticPath))


//Routing
app.get('/',(req,res)=>{
    res.send("Welcome to express")
})
app.get('/about',(req,res)=>{
    res.send("Welcome to express, About page")
})
app.get('/weather',(req,res)=>{
    res.send("Welcome to weather ")
})

app.get('*',(req,res)=>{
    res.send("404 ERROR")
})

app.listen(port,()=>{
    console.log(`Listening on port number ${port}`)
})