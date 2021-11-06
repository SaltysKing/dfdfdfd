import React, { useState, useEffect, useCallback } from "react";

import CityForm from "./components/CityForm";
import ForecastGraph from "./components/ForecastGraph";

import cloudyLarge from "./images/cloudy-large.svg";
import cloudyWhite from "./images/cloudy-white.svg";
import keys from "./secrets.json";
import "./App.css";

function App() {
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("London, GB");

  const chart = {
    chartLabels: [
      // '',
      'Morning',
      'Afternoon',
      'Evening',
      'Overnight',
      // '',
    ],
    chartData: [
      100,
      40,
      50,
      70,
      60,
      40,
    ]
  }

  // const openWeatherAPI = "";

  const fetchForecastHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${keys.openWeatherAPI}&units=imperial`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();

      const c = new Date();
      //5:05 PM, Mon, Nov 23, 2020
      const currentTime = c.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        weekday: "short",
        month: "short",
        day: "numeric",
      });

      function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      }
      const timeUpdated = new Date();
      let day = [];
      let totalDays = 3;
      let currentDate = timeUpdated.toLocaleString("en-US", {
        day: "numeric",
      });
      let nextDate = addDays(timeUpdated, 1);
      let prevDate;
      nextDate = nextDate.toLocaleString("en-US", {
        day: "numeric",
      });
      let transformedDays = [];
      let tempData = [];

      for (let i = 0; i < data.list.length; i++) {
        const forecastData = data.list[i];

        const t = new Date(parseInt(forecastData.dt * 1000));
        const humanDateFormat = t.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
        });
        currentDate = t.toLocaleString("en-US", {
          day: "numeric",
        });

        if (currentDate == nextDate) {
          transformedDays.push({ day: prevDate, forecast: tempData });
          nextDate = addDays(t, 1);
          nextDate = nextDate.toLocaleString("en-US", {
            day: "numeric",
          });
          tempData = [];
        }
        // add new day entry
        tempData.push({
          time: humanDateFormat,
          temp: Math.trunc(forecastData.main.temp),
          feels_like: Math.trunc(forecastData.main.feels_like),
          pressure: Math.trunc(forecastData.main.pressure),
          humidity: forecastData.main.humidity,
        });
        prevDate = humanDateFormat;
      }

      const transformedForecast = [
        {
          name: data.city.name,
          currentTime: currentTime,
          days: transformedDays,
        },
      ];
      setForecast(transformedForecast);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [city]);
  useEffect(() => {
    fetchForecastHandler();
  }, [fetchForecastHandler]);

  const addCityHandler = (city) => {
    setCity(city);
  };

  let content = <p>No forecast available.</p>;

  if (error) {
    content = <p>Error: {error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (forecast.length > 0) {
    content = (
      <section className="main-inner">
        <div className="left-widget">
          <div className="cityTitle">{forecast[0].name} Weather</div>
          <div className="currentTime">{forecast[0].currentTime}</div>
          <div className="currentForecast">
            <img src={cloudyLarge} alt="Cloudy" />
            <div className="temp-wrapper">
              <span className="temp-big">
                {forecast[0].days[0].forecast[0].temp}
              </span>
              <div className="sup">
                <span className="deg">&deg;</span> F
              </div>
            </div>
          </div>
          <div className="textForecast">Cloudy</div>
          <div className="feelsLike">
            Feels Like {forecast[0].days[0].forecast[0].feels_like}&deg;
          </div>
          <div className="row bottom-info">
            <div className="col">
              <h4>Humidity</h4>
              45%
            </div>
            <div className="col">
              <h4>Wind Speed</h4>
              19.2 km/j
            </div>
          </div>
        </div>
        <div className="right-widget">
          <ForecastGraph chartLabels={chart.chartLabels} chartData={chart.chartData} />
          {/* {state.chartData.length && state.chartLabels.length ? (
            <ForecastGraph {...state} />
          ) : null} */}
          <div className="forecast-tabs">
          {forecast[0].days.map((day, i) => (
            <ul>
              <li className="day">{day.day}</li>
              <li className="text-forecast">
                <img src={cloudyWhite} alt="Cloudy" />
              </li>
              {/* <li>Temperature: {day.temp}&deg;</li> */}
              {/* First Humidity for now */}
              <li className="humidity">
                Humidity: {day.forecast[0].humidity}%
              </li>
              {/* <li>Pressure: {day.pressure}</li> */}
            </ul>
          ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="App">
      <section className="main">
        <CityForm onSubmitHandler={addCityHandler} />
        {content}
      </section>
    </div>
  );
}

export default App;
