import React, { Component } from 'react';
import './SearchForm.css';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Form, FormControl, Button, Navbar,
} from 'react-bootstrap';

export default class SearchForm extends Component {
  constructor() {
    super();
    this.submitCity = this.submitCity.bind(this);
    this.textInput = React.createRef();
    this.reload = this.reload.bind(this);
  }

  reload() {
    window.location.reload();
  }

  submitCity(event) {
    const inputValue = this.textInput.current.value;
    event.preventDefault();
    this.props.updateCityName(inputValue);
  }

  render() {
    return (
      <div>
        <Navbar className="nav" bg="light" variant="light">
          <Navbar.Brand href="#" onClick={this.reload}>UI-Weather</Navbar.Brand>
          <Form className="nav__form" inline action="/#" onSubmit={this.submitCity}>
            <FormControl
              className="mr-sm-2 nav__input"
              type="search"
              placeholder="Введите название города на английском, минимум 3 симв."
              minLength="3"
              ref={this.textInput}
            />
            <Button variant="outline-primary" type="submit" value="Отправить">Поиск</Button>
          </Form>
        </Navbar>
      </div>
    );
  }
}

SearchForm.propTypes = { updateCityName: PropTypes.func };
