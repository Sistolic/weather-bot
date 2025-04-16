require('dotenv').config();
const API_KEY = process.env.WEATHER_API_KEY;

const obj = require('./phrases.json');
const request = require('request');

function getAPhrase(temp) {
  for (item of obj) {
    if (temp >= item.min && temp <= item.max) {
      return item.phrase;
    }
  }
}
function getWeather(city) {
  return new Promise((resolve, reject) => {
    if (city == "") reject("No city was provided");
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`  

    request.get(weatherUrl, (err, res, body) => {
      if (err) reject(`There was an error ${err}`)
      
      var parsedData = JSON.parse(body);    

      var temp = Math.round(parsedData.main.temp - 273.15);
      var description = getAPhrase(temp);

      resolve({ temp, description });
    });

  });

}

module.exports.getWeather = getWeather;