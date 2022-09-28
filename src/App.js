import React, { useState, useEffect } from "react";
//import axios from "axios";
import moment from "moment";

function App() {
  const [weather, setWeather] = useState({});
  const [query, setQuery] = useState("lagos");
  const [search, setSearch] = useState("");

  //const d = new Date();
  //const d = new Date(allData.date * 1000).toLocaleDateString();
  //const newD = moment(d).format("h:mm a, MMM Do YYYY");

  const changeHandler = (e) => {
    setSearch(e.target.value);
  };

  const fetchDetail = async () => {
    const api1 =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      query +
      "&units=metric&appid=eae4c7df9d0c80084e5da9ace7f1a8b9";
    try {
      const resp = await fetch(api1);
      const data = await resp.json();
      setWeather(data);
      //setQuery("");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  // const fetchDetail = async () => {
  //   const api =
  //     "https://api.openweathermap.org/data/2.5/weather?q=Enugu,NG&appid=eae4c7df9d0c80084e5da9ace7f1a8b9";
  //   try {
  //     const response = await axios.get(api);
  //     setWeather(response.data);
  //     setQuery("");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    fetchDetail();
  }, [query]);

  const handleSumit = (e) => {
    e.preventDefault();
    setQuery(search);
  };

  return (
    <div className="weather">
      <div id="weather-app">
        <div className="app-name">CREATIVE KEN</div>
        <div className="app-name">Weather App</div>
      </div>
      <div className="details">
        <div className="weather-search">
          <form onSubmit={handleSumit}>
            <input
              type="text"
              value={search}
              onChange={changeHandler}
              placeholder="enter your location"
            />
            <button className="btn btn-primary">Search</button>
          </form>
        </div>

        <div id="weather-details">
          <div className="location-date">
            {moment(weather.dt * 1000).format(" MMM Do YYYY")}
          </div>
          <div className="location-city">
            {weather ? weather.name + ", " : ""}
            {weather.sys ? weather.sys.country : ""}
          </div>
          <div className="temp-value">
            {weather.main ? Math.round(weather.main.temp) + " degrees" : ""}
          </div>
          <div className="weather-icon">
            <img
              src={
                weather.weather
                  ? "http://openweathermap.org/img/w/" +
                    weather.weather[0].icon +
                    ".png"
                  : ""
              }
              alt="weather icon"
            />
          </div>
          <div className="temp-reading">
            {weather.weather ? weather.weather[0].description : ""}
          </div>
        </div>
      </div>
      <footer>
        <p>&copy; 2021. All Right Reserved to Idoko Kenneth</p>
      </footer>
    </div>
  );
}

export default App;
