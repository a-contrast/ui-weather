import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class WeatherDisplayClass extends Component {
  constructor() {
    super();
    this.state = {
      cities: null,
      weatherData: null,
      isWaiting: true,
      errorCity: false,
      isMultyCity: false,
    };
    this.getWeather = this.getWeather.bind(this);
  }

  componentDidMount() {
    this.getCities();
  }

  componentDidUpdate(prevProps) {
    if (this.props.city !== prevProps.city) {
      this.getCities();
    }
  }

  /**
   * получаем список найденых городов, если город один, переходим к getweather
   */
  getCities() {
    this.setState({ isWaiting: true, errorCity: false });
    const { city } = this.props; // значение инпута
    const URL = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.metaweather.com/api/location/search/?query=${city}`)}`;
    fetch(URL)
      .then((res) => res.json())
      .then((json) => {
        const cities = JSON.parse(json.contents);
        if (cities.length > 1) {
          this.setState({ cities, isWaiting: false, isMultyCity: true });
        } else {
          this.getWeather(cities[0].woeid);
        }
      })
      .catch(() => {
        this.setState({ errorCity: true });
      });
  }

  /**
   * получаем массив данных о погоде в выбранном городе, записываем его в weatherData
   * @param {num} woeid - woeid выбраного города
   */
  getWeather(woeid) {
    this.setState({ isWaiting: true });
    const URL = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.metaweather.com/api/location/${woeid}`)}`;
    fetch(URL)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          weatherData: JSON.parse(json.contents),
          isWaiting: false,
          isMultyCity: false,
        });
      });
  }

  render() {
    const { cities } = this.state; // список имен найденных городов
    const { weatherData } = this.state; // данные о погоде выбранного города
    const cityList = cities && cities.map((value, index) => ( // создаем строки списка ul из городов
      <li key={index}>
        <a href="#" onClick={() => this.getWeather(value.woeid)}>{value.title}</a>
      </li>
    ));
    if (this.state.errorCity) {
      return (
        <div>
          <p>Имя города не найдено.</p>
          <p>Проверьте правильность написания, либо введите ближайший крупный населенный пункт</p>
        </div>
      );
    }
    if (this.state.isWaiting) {
      return (
        <div>Loading</div>
      );
    }
    if (this.state.isMultyCity) {
      return (
        <ul>
          {cityList}
        </ul>
      );
    }
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
