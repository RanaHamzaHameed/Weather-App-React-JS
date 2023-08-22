import React, { useState } from 'react';

// CSS
import './WeatherApp.css';

// Images
import ClearIcon from '../Assets/clear.png';
import CloudIcon from '../Assets/cloud.png';
import DrizzleIcon from '../Assets/drizzle.png';
import HumidityIcon from '../Assets/humidity.png';
import RainIcon from '../Assets/rain.png';
import SearchIcon from '../Assets/search.png';
import SnowIcon from '../Assets/snow.png';
import WindIcon from '../Assets/wind.png';

const WeatherApp = () => {

    const [weatherIcon, setWeatherIcon] = useState(CloudIcon);

    let api_key = "5859a0b8358b7576b14b108823dd5c17";

    const search = async () => {
        const element = document.getElementsByClassName('cityInput');

        if (element[0].value === '') {
            return 0;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        let response = await fetch(url);
        let data = await response.json();

        const humidity = document.getElementsByClassName('humidity-percent');
        const wind = document.getElementsByClassName('wind-rate');
        const temperature = document.getElementsByClassName('weather-temp');
        const location = document.getElementsByClassName('weather-location');

        humidity[0].innerHTML = data.main.humidity+" %";
        wind[0].innerHTML = data.wind.speed+" km/h";
        temperature[0].innerHTML = Math.floor(data.main.temp)+" °C";
        location[0].innerHTML = data.name;

        if(data.weather[0].icon === '01d' || data.weather[0].icon === '01n'){
            setWeatherIcon(ClearIcon);
        } else if(data.weather[0].icon === '02d' || data.weather[0].icon === '02n') {
            setWeatherIcon(CloudIcon);
        } else if(data.weather[0].icon === '03d' || data.weather[0].icon === '03n') {
            setWeatherIcon(DrizzleIcon);
        } else if(data.weather[0].icon === '04d' || data.weather[0].icon === '04n') {
            setWeatherIcon(DrizzleIcon);
        } else if(data.weather[0].icon === '09d' || data.weather[0].icon === '09n') {
            setWeatherIcon(RainIcon);
        } else if(data.weather[0].icon === '10d' || data.weather[0].icon === '10n') {
            setWeatherIcon(RainIcon);
        } else if(data.weather[0].icon === '13d' || data.weather[0].icon === '13n') {
            setWeatherIcon(SnowIcon);
        } else {
            setWeatherIcon(ClearIcon);
        }
    }

    return (
        <div className="container">
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder='Search' />
                <div className="search-icon" onClick={() => { search() }}>
                    <img src={SearchIcon} alt="Search Icon" />
                </div>
            </div>
            <div className="weather-image">
                <img src={weatherIcon} alt="" />
            </div>
            <div className="weather-temp">34°C</div>
            <div className="weather-location">Lahore</div>
            <div className="data-container">
                <div className="element">
                    <img src={HumidityIcon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={WindIcon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-rate">18 km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp;