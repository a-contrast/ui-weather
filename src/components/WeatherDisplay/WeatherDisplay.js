import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import { ListGroup, Nav, Table } from 'react-bootstrap';
import './WeatherDisplay.css';

export default class WeatherDisplay extends Component {
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
      <ListGroup.Item key={index}>
        <a href="#" onClick={() => this.getWeather(value.woeid)}>{value.title}</a>
      </ListGroup.Item>
    ));
    if (this.state.errorCity) {
      return (
        <div className="message">
          <p>Имя города не найдено.</p>
          <p>Проверьте правильность написания, либо введите ближайший крупный населенный пункт</p>
        </div>
      );
    }
    if (this.state.isWaiting) {
      return (
        <div className="message"><b>Loading...</b></div>
      );
    }
    if (this.state.isMultyCity) {
      return (
        <div className="message cities">
          <h4>Список найденных городов</h4>
          <Nav bsStyle="pills" stacked>
            <ListGroup className="cities__list" variant="flush">
              {cityList}
            </ListGroup>
          </Nav>
        </div>
      );
    }
    return (
      <div className="weather">
        <h3>
          Погода в городе {weatherData.title}
        </h3>
        <p>
          на <b>{weatherData.consolidated_weather[0].applicable_date}</b>
        </p>
        <img
          className="ImgState"
          width="100"
          height="100"
          src={`https://www.metaweather.com/static/img/weather/${weatherData.consolidated_weather[0].weather_state_abbr}.svg`}
          alt="Картинка погоды"
        />
        <div className="weather__tables tables">
          <Table className="tables__table" striped borderless hover>
            <thead>
              <tr>
                <th>Температура</th>
                <th>&deg;C</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>текущая</td>
                <td>{Math.round(weatherData.consolidated_weather[0].the_temp)}</td>
              </tr>
              <tr>
                <td>минимальная</td>
                <td>{Math.round(weatherData.consolidated_weather[0].min_temp)}</td>
              </tr>
              <tr>
                <td>максимальная</td>
                <td>{Math.round(weatherData.consolidated_weather[0].max_temp)}</td>
              </tr>
            </tbody>
          </Table>
          <Table striped borderless hover className="tables__table">
            <thead>
              <tr>
                <th>Ветер</th>
                <th>м/с</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>скорость</td>
                <td>{Math.round(weatherData.consolidated_weather[0].wind_speed * 0.44704)}</td>
              </tr>
            </tbody>
          </Table>
          <Table striped borderless hover className="tables__table">
            <thead>
              <tr>
                <th>Давление</th>
                <th>мм.рт.ст</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>давление</td>
                <td>{Math.round(weatherData.consolidated_weather[0].air_pressure * 0.750062)}</td>
              </tr>
            </tbody>
          </Table>

        </div>
      </div>
    );
  }
}

WeatherDisplay.propTypes = { city: PropTypes.string.isRequired };
