const apiKey="5eebd043847ad36119a6e390a00cd174";
const api_url="https://api.openweathermap.org/data/2.5/weather?units=metric";



let temp=document.querySelector("#temp");
let city=document.querySelector("#city");
let humidity=document.querySelector("#humidity");
let windSpeed=document.querySelector("#wind-speed");
let btn=document.querySelector("#search-button");
let inputBox=document.querySelector("#city-input");
let weatherIcon=document.querySelector("#weather-icon");

const defaultCity="kolkata";

function getIcon(weatherCondition){
    if(weatherCondition=="Thunderstorm"){
        return "./images/Thunderstorm.png";
    }else if(weatherCondition=="Drizzle"){
        return "./images/drizzle.png";
    }else if(weatherCondition=="Rain"){
        return "./images/rain.png";
    }else if(weatherCondition=="Snow"){
        return "./images/snow.png";
    }else if(weatherCondition=="Clear"){
        return "./images/clear.png";
    }else if(weatherCondition=="Clouds"){
        return "./images/clouds.png";
    }else{
        return "./images/mist.png";
    }
}


async function getWeather(inputCity){
    
    const response= await fetch(api_url+ `&q=${inputCity}`+`&appid=${apiKey}`);
    if(response.status==404){
        document.querySelector(".error").style.display="block";
    }else{
    
    let data = await response.json();
    //console.log(data);

    temp.textContent=Math.floor(data.main.temp);
    city.textContent=data.name;
    humidity.textContent=data.main.humidity+" %";
    windSpeed.textContent=data.wind.speed+" Km/h";
   
    let weatherCondition=data.weather[0].main;
    weatherIcon.src=getIcon(weatherCondition);
    document.querySelector(".error").style.display="none";
    }
}

btn.addEventListener("click",()=>{
    let cityInput=inputBox.value;
    if(cityInput==="") return;
    getWeather(cityInput);
})
// -----------------initial call-----------------//
getWeather(defaultCity);