import React from "react";
//import axios from "axios";
import moment from "moment";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      weather: {},
      query: "lagos",
      search: "",
    };
  }

  changeHandler = (e) => {
    this.setState({ search: e.target.value });
  };

  fetchDetail = async () => {
    const api1 =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      this.state.query +
      "&units=metric&appid=eae4c7df9d0c80084e5da9ace7f1a8b9";

    try {
      const resp = await fetch(api1);
      const data = await resp.json();
      this.setState({ weather: data });
      //this.state.setQuery("");
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

  componentDidMount() {
    this.fetchDetail();
  }

  render() {
    const deg = () => {
      return <sup>o</sup>;
    };
    const d = new Date();
    const newD = moment(d).format("h:mm a, MMM Do YYYY");
    return (
      <div className="weather">
        <div id="weather-app">
          <div className="app-name">CREATIVE KEN</div>
          <div className="app-name">Weather App</div>
        </div>
        <div className="details">
          <div className="weather-search">
            <form onSubmit={this.fetchDetail}>
              <input
                type="text"
                value={this.state.search}
                onChange={this.changeHandler}
              />
              <button className="btn btn-primary">Search</button>
            </form>

            <div id="weather-details">
              <div className="location-date">{newD}</div>
              <div className="location-city">
                {this.state.weather ? this.state.weather.name : ""},{" "}
                {this.state.weather.sys ? this.state.weather.sys.country : ""}
              </div>
              <div className="temp-value">
                {this.state.weather.main ? this.state.weather.main.temp : ""}
              </div>
              <div className="weather-icon">
                <img
                  src={
                    this.state.weather.weather
                      ? "http://openweathermap.org/img/w/" +
                        this.state.weather.weather[0].icon +
                        ".png"
                      : ""
                  }
                  alt="weather icon"
                />
              </div>
              <div className="temp-reading">
                {this.state.weather.weather
                  ? this.state.weather.weather[0].description
                  : ""}
              </div>
              <footer>
                <p>&copy; 2021. All Right Reserved to Idoko Kenneth</p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
