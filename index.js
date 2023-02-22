const express = require('express')
const app = express()
app.set("view engine", "ejs")
app.get("/", function(req, res) {
    res.send("Hi")
})

app.listen(3000, () => {
    console.log("start listening to port 3000")
})