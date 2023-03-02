const express = require('express') //Import express to the program as "express" to start the server
const axios = require('axios') //Import axios to the program as "axios" to fetch data through api
const app = express() //Create the object express and assign it to the variable app so it can be used
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose')
const uri = "mongodb+srv://douwenduo:AZ0VIEUgsfnCOjPa@cluster0.gxcwbmi.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const characterSchema = new mongoose.Schema({
    name: String,
    height: String,
    mass: String
})
const Chara = mongoose.model('Character2', characterSchema)
    // client.connect(err => {
    //     const collection = client.db("cluster0").collection("devices");
    //     // perform actions on the collection object
    //     console.log("Connected to MongoDB")
    //     client.close();
    // });
    // client.connect()
app.get('/mongodb', async(req, res) => {
    try {
        const resp = await axios.get("https://swapi.dev/api/people") //Fetching data from the url and assigning it to a variable
        res.render("characters", { character: resp.data })
        mongoose.set('strictQuery', true);
        const connection = await mongoose.connect(uri);
        console.log("connected to MongoDB")
        n = 0
        for (const c of resp.data.results) {
            console.log(c)
            const record = new Chara({
                name: c.name,
                height: c.height,
                weight: c.mass
            })
            n += 1
            console.log("Saving record", n)
            await record.save()
            console.log("Record", n, "saved")
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching the response');
    }
});
app.set("view engine", "ejs") //Set the view engine as ejs
app.set("views", './views') //Set the file path to access ejs files
    // app.get("/", function(req, res) {
    //     res.render('home') //When user type localhost:3000 send the ejs page home 
    // })
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