import React, { Component } from 'react';
import './App.css';
import WeatherDisplayClass from './WeatherDisplayClass';

class App extends Component {
  constructor() {
    super();
    this.submitCity = this.submitCity.bind(this);
    this.state = {
      cityName: null,
    };
    this.textInput = React.createRef();
  }

  submitCity() {
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
          <WeatherDisplayClass city={this.state.cityName} />
        )}
      </div>
    );
  }
}

export default App;
