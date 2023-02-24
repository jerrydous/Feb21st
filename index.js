const express = require('express') //Import express to the program as "express" to start the server
const axios = require('axios') //Import axios to the program as "axios" to fetch data through api
const app = express() //Create the object express and assign it to the variable app so it can be used
app.set("view engine", "ejs") //Set the view engine as ejs
app.set("views", './views') //Set the file path to access ejs files
app.get("/", function(req, res) {
    res.render('home') //When user type localhost:3000 send the ejs page home 
})
app.get("/characters/", async(req, res) => {
    try {
        const resp = await axios.get("https://swapi.dev/api/people") //Fetching data from the url and assigning it to a variable
        res.render("characters", { character: resp.data }) //Sending back ejs file characters.ejs with data fetched from the api
    } catch (error) {
        console.log(error) //Report the error in the console when there is one
    }


})
app.listen(3000, () => { //Listening to the port 3000
    console.log("start listening to port 3000")
})