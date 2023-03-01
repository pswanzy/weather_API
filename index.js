const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
// require('dotenv').config();
// const weatherAPI = process.env.weatherAPI; <--not sure how to work
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
  app.post("/", function(req, res) {
    var queryLat = req.body.latitude.toString();
    var queryLon = req.body.longitude.toString();
    const apiKey = "f418a32419cf73a83192c280a7b273bf";
    const units = "imperial";
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + queryLat + "&lon=" + queryLon + "&appid=" + apiKey + "&units=" + units;
    https.get(url, function(response) {
      console.log(response.statusCode);
      response.on("data", function(data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const humidity = weatherData.main.humidity; 
        const description = weatherData.weather[0].description;
        const cloudCover = weatherData.clouds.all;
        const windSpeed = weatherData.wind.speed;
        const gustSpeed = weatherData.wind.gust;
        const icon = weatherData.weather[0].icon;
        const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write("<h1>The weather at those coordinates is currently " + description + "</h1>");         
        res.write("<h3>The temperature is " + temp + " degrees Farenheit</h3>");
        res.write("<h3>The humidity is " + humidity + "%</h3>");
        res.write("<h3>The cloud coverage in this area is " + cloudCover + "%</h3>");
        res.write("<h3>The current wind is " + windSpeed + " mph, with gusts of " + gustSpeed + " mph</h3>");
        res.write("<img src=" + imgURL + ">");
        res.send();
      })
    });
  });
})
app.listen(3000, function() {
  console.log("Server is really on the move!");
})