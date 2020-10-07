import React, { Component } from 'react';
import './App.css';
import WeatherDisplay from './components/WeatherDisplay';
import SearchForm from './components/SearchForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cityName: null,
    };
    this.updateCityName = this.updateCityName.bind(this);
  }

  updateCityName(cityName) {
    this.setState({ cityName });
  }

  render() {
    return (
      <div className="App">
        <SearchForm updateCityName={this.updateCityName} />
        {this.state.cityName && (
          <WeatherDisplay city={this.state.cityName} />
        )}
      </div>
    );
  }
}

export default App;
