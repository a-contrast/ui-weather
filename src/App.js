import React, { Component } from 'react';
import './App.css';
import WeatherDisplay from './components/WeatherDisplay';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cityName: null,
    };
    this.submitCity = this.submitCity.bind(this);
    this.textInput = React.createRef();
  }

  submitCity(event) {
    event.preventDefault();
    this.setState({ cityName: this.textInput.current.value });
  }

  render() {
    return (
      <div className="App">
        <form action="/#" onSubmit={this.submitCity}>
          <input type="search" placeholder="Название города на английском" size="35" ref={this.textInput} />
          <button type="submit" value="Отправить">Показать</button>
        </form>
        {this.state.cityName && (
          <WeatherDisplay city={this.state.cityName} />
        )}
      </div>
    );
  }
}

export default App;
