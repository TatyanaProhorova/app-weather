import React, { Component } from "react";



// const API_KEY = import.meta.env.API_KEY;

// const API_KEY = "aa31822992d867d5cdbc0d5461abd90a";

class MyWeatherComponent extends Component {
  state = {
    weatherData: ""
  };

  componentDidMount() {
    this.fetchWeatherData();
  }

  fetchWeatherData = () => {
    // const API_KEY = import.meta.env.API_KEY;
    fetch(
     //  `https://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&appid=import.meta.env.API_KEY`
     // `https://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&appid=${API_KEY}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          weatherData: data
        });
      });
  };

  render() {
    return (
      <div>
        {this.state.weatherData?.name}
        {this.state.weatherData?.main?.temp}
      </div>
    );
  }
}

export default MyWeatherComponent;
