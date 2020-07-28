
import { formValidation } from './formValidation'

// Personal API Key for OpenWeatherMap API
let baseURL = 'http://api.geonames.org/searchJSON?q='
let userName = 'michael1'

let weatherKey ='fbfa4596c5f9433d8a63bed50f061c6a'
let weatherApi = 'http://api.weatherbit.io/v2.0/current?'

let imageApi = 'https://pixabay.com/api/?key='
let pixKey = '17657024-de71bcfb4648e9a612f88a9cd&q='

// Event listener to add function to existing HTML DOM element
document.getElementById('getInfo').addEventListener('click', formValidation);


/* Function called by event listener */

function performAction(){
  let long,
  lat,
  weatherData;
  const country = document.getElementById("country").value;
  getImage(imageApi, pixKey, country).then(function(res){
    let imageUrl = res.hits[0].webformatURL
    console.log(res.hits[0].largeImageURL)
    document.querySelector(".loaction-image").setAttribute("src", imageUrl)
  })
  getDataCordinates(baseURL,country, userName)
     .then(function(data){
        long = data.geonames[0].lng
        lat = data.geonames[0].lat
     }).then(function(){
      console.log(long, lat)
      weatherCondition(weatherApi, weatherKey, long , lat)
      .then(function(data){
        weatherData = data.data[0]
        console.log(weatherData)
      }).then(function(){
      let cityName = weatherData.city_name,
        dateTime = weatherData.datetime,
        weatherDescription = weatherData.weather.description,
        weatheTemp = weatherData.temp;
        document.querySelector(".response-section .location").innerHTML= `location: ${cityName}`;
        document.querySelector(".date-reservation").innerHTML = `date-reservation: ${dateTime}`;
        document.querySelector(".weather-status").innerHTML = `weather-status: ${weatherDescription}`
        document.querySelector(".weather-temp").innerHTML = `weather-temp: ${weatheTemp}`
        document.getElementById("travel-form").style.display = "none"
        document.getElementById("reload").addEventListener("click", function(){
          location.reload(true);
        })
       })
     
     }) 
  
}

/* Function to GET Web API Data*/
const getDataCordinates = async (baseURL, country, userName)=>{
  const res = await fetch(baseURL + country+ '&maxRows=10&username=' + userName)
    try {
      const data = res.json()
      return data
    } catch(error){
       console.log("error", error)
    }
  }
  // to get image 
  const getImage = async (imageApi, pixKey, country)=>{
    const res = await fetch(imageApi + pixKey+ country)
      try {
        const data = res.json()
        return data
      } catch(error){
         console.log("error", error)
      }
    }
  /* Function to GET Web API Data*/
const weatherCondition = async (weatherApi, weatherKey, long , lat)=>{
  const res = await fetch(weatherApi +'&lat='+ lat +'&lon='+ long + '&key=' + weatherKey)
    try {
      const data = res.json()
      return data
    } catch(error){
       console.log("error", error)
    }
  }
// /* Function to POST data */
const postData = async ( url = '', data = {})=>{
      const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header
      body: JSON.stringify(data),
    });
      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }
// /* Function to GET Project Data */
let updateUi = async () =>{
  const request = await fetch('/getData');
    try {
      const allData = await request.json()
       console.log(allData)
       document.getElementsByClassName("location").innerHTML= `location: ${cityName}`;
       document.getElementsByClassName("date-reservation").innerHTML = `date-reservation: ${weatherDescription}`;
       document.getElementsByClassName("weather-status").innerHTML = `weather-status: ${weatherDescription}`
    }
    catch(error) {
      console.log("error", error);
    }
}



export{performAction}
export{ weatherCondition}
export {postData}