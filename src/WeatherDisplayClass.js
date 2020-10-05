import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class WeatherDisplayClass extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null,
      isWaiting: true,
      errorCity: false,
    };
  }

  componentDidMount() {
    this.getWeather();
  }

  componentDidUpdate(prevProps) {
    if (this.props.city !== prevProps.city) {
      this.getWeather();
    }
  }

  getWeather() {
    this.setState({ isWaiting: true });
    this.setState({ errorCity: false });
    const { city } = this.props;
    const URL = `https://cors-anywhere.herokuapp.com/www.metaweather.com/api/location/search/?query=${city}`;
    fetch(URL)
      .then((res) => res.json())
      .then((json) => fetch(`https://cors-anywhere.herokuapp.com/www.metaweather.com/api/location/${json[0].woeid}`))
      .then((res) => res.json())
      .then((json) => {
        this.setState({ weatherData: json, isWaiting: false });
      })
      .catch(() => {
        this.setState({ errorCity: true });
      });
  }

  render() {
    const { weatherData } = this.state;

    if (this.state.errorCity) {
      return (
        <div>
          <p>Имя города не найдено.</p>
          <p>Проверьте правильность написания, либо введите ближайший крупный населенный пункт</p>
        </div>
      );
    }
    if (this.state.isWaiting) return <div>Loading</div>;
    return (
      <div>
        <h2>
          Температура в городе {weatherData.title}
        </h2>
        <img
          className="ImgState"
          width="50"
          height="50"
          src={`https://www.metaweather.com/static/img/weather/${weatherData.consolidated_weather[0].weather_state_abbr}.svg`}
          alt="Картинка погоды"
        />
        <div>
          температура на {weatherData.consolidated_weather[0].applicable_date}
        </div>
        <div>
          минимальная {Math.round(weatherData.consolidated_weather[0].min_temp)}&deg;C
        </div>
        <div>
          максимальная {Math.round(weatherData.consolidated_weather[0].max_temp)}&deg;C
        </div>
      </div>
    );
  }
}

WeatherDisplayClass.propTypes = { city: PropTypes.string.isRequired };
