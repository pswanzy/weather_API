const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
  app.post("/", function(req, res) {
    const query = req.body.cityName;
    const apiKey = "f418a32419cf73a83192c280a7b273bf";
    const units = "imperial";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;
    https.get(url, function(response) {
      console.log(response.statusCode);
      response.on("data", function(data) {
        const weatherData = JSON.parse(data); // takes JSON string and makes object {name:"value", } pairs
        //const temp = weatherData.main.temp;
        const humidity = weatherData.main.humidity; // add humidity and wind speed data
        const description = weatherData.weather[0].description;
        const windSpeed = weatherData.wind.speed;
        //const icon = weatherData.weather[0].icon;
        //const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

        //res.write("<h3>The temperature in " + query + " is " + temp + " degrees Farenheit</h3>");
        res.write("<h3>The weather in " + query + " is currently " + description + "</h3>");
        //add humidity and windspeed headings
        res.write("<h3>The humidity is " + humidity + "%</h3>");
        res.write("<h3>The current wind speed is " + windSpeed + " mph</h3>");
        //res.write("<img src=" + imgURL + ">"); //<img> html info, using imgURL
        //res.write("<br><br><h1>Now, GO OUTSIDE!</h1>");
        res.send();
      })
    });
  });
})


app.listen(3000, function() {
  console.log("Server is moving fast!");
})

// API Key weather app
// f418a32419cf73a83192c280a7b273bf