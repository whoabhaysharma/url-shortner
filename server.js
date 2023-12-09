const express = require("express")

const app = express()

app.listen(3000, ()=>{
    console.log("listening")
})

app.get("/", async(req, res) =>{
    res.send("hello")
})