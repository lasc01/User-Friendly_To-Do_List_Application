const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const date = require(__dirname + "/date.js")

const app = express();

const port = process.env.PORT; 

let myLists = [];

let workLists = [];

// let userCity = prompt("What city are you in?");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static("public"));

app.get("/", function(req, res){
    // const apikey = "a6f054d979f364e4079b1ad144da3bfa"

    // const url ="https://api.openweathermap.org/data/2.5/weather?q=lagos&units=metric&appid=" + apikey + "#"

    // https.get(url, function(resp){
    //     console.log(resp.statusCode);

    //     resp.on("data", function(data){
    //         const weatherData = JSON.parse(data);
    //         const temp = weatherData.main.temp;
    //         const des = weatherData.weather[0].description;
    //         const icon = weatherData.weather[0].icon;
    //         let iconLink = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

    //         res.render("index", {temperature: temp, description: des, icon: iconLink});

    //     });
    // });

    res.sendFile(__dirname + "/index.html");
})

app.get("/list", function(req, res){

    let day = date()

    const apikey = "a6f054d979f364e4079b1ad144da3bfa"

    const url ="https://api.openweathermap.org/data/2.5/weather?q=lagos&units=metric&appid=" + apikey + "#"

    https.get(url, function(resp){
        console.log(resp.statusCode);

        resp.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const des = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            let iconLink = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.render("list", {todayDate: day, addItem: myLists, temperature: temp, description: des, icon: iconLink});

            

        });
    });

});

app.post("/", function(req,res){

    let myList = req.body.addList;

    if(req.body.list === "work"){
        workLists.push(myList);
        res.redirect("/work");
    }else{
    myLists.push(myList);;
    res.redirect("/list"); 
    }


})

app.get("/work", function(req, res){

    const apikey = "a6f054d979f364e4079b1ad144da3bfa"

    const url ="https://api.openweathermap.org/data/2.5/weather?q=lagos&units=metric&appid=" + apikey + "#"

    https.get(url, function(resp){
        console.log(resp.statusCode);

        resp.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const des = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            let iconLink = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.render("list", {todayDate: "work list", addItem: workLists, temperature: temp, description: des, icon: iconLink});

        });
    });
})


app.get("/about", function(req, res){

    const apikey = "a6f054d979f364e4079b1ad144da3bfa"

    const url ="https://api.openweathermap.org/data/2.5/weather?q=lagos&units=metric&appid=" + apikey + "#"
    https.get(url, function(resp){
        console.log(resp.statusCode);

        resp.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const des = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            let iconLink = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.render("about", {temperature: temp, description: des, icon: iconLink});

            // res.render("index", {temperature: temp, description: des, icon: iconLink})
        });
    });

 });

 app.get("/contact", function(req, res){

    const apikey = "a6f054d979f364e4079b1ad144da3bfa"

    const url ="https://api.openweathermap.org/data/2.5/weather?q=lagos&units=metric&appid=" + apikey + "#"
    https.get(url, function(resp){
        console.log(resp.statusCode);

        resp.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const des = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            let iconLink = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.render("contact", {temperature: temp, description: des, icon: iconLink});

            // res.render("index", {temperature: temp, description: des, icon: iconLink})
        });
    });

 });
		

app.listen(port || 3000, function(){
    console.log("Server is running on port 3000")
})
