import React, { useState } from 'react';
import Conditions from './conditions/Conditions';
import classes from './Forecast.module.css';

const Forecast = () => {

    let [responseObj, setResponseObj] = useState({});
    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('imperial');

    //handling error and loading
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

    const uriEncodedCity = encodeURIComponent(city);

    function getForecast(e) {
        e.preventDefault();

        if (city.length === 0) {
            return setError(true);
        }

        //clear state for new data
        setError(false);
        setResponseObj({});

        setLoading(true);

        let uriEncodedCity = encodeURIComponent(city);

        fetch(`https://community-open-weather-map.p.rapidapi.com/weather?q=${uriEncodedCity}&units=${unit}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                "x-rapidapi-key": "d81f85b4bdmshe3017361403961ep149fa5jsn23c55b7431c8"
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.cod !== 200) {
                    throw new Error()
                }

                setResponseObj(response);
                setLoading(false);
            })
            .catch(err => {
                setError(true);
                setLoading(false);
                console.error(err.message);
            });
    }

    return (
        <div>
            <h2>Find Current weather Conditions</h2>
            <form onSubmit={getForecast}>
                <input
                    className={classes.textInput}
                    type="text"
                    placeholder="Enter City"
                    maxLength="50"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <label className={classes.Radio}>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "imperial"}
                        value="imperial"
                        onChange={(e) => setUnit(e.target.value)}
                    />
                    Fahrenheit
                </label>
                <label className={classes.Radio}>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "metric"}
                        value="metric"
                        onChange={(e) => setUnit(e.target.value)}
                    />
                    Celcius
                </label>

                <button className={classes.Button} type="submit">Get Forecast</button>

            </form>
            <Conditions
                responseObj = {responseObj}
                error = {error}
                loading = {loading}
            />
        </div>
    )
}

export default Forecast;