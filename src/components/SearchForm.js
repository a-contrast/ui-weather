import React, { Component } from 'react';
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
    event.preventDefault();
    this.props.updateCityName(this.textInput.current.value);
  }

  render() {
    return (
      <div>
        <Navbar bg="light" variant="light" style={{ justifyContent: 'center' }}>
          <Navbar.Brand href="#" onClick={this.reload}>UI-Weather</Navbar.Brand>
          <Form inline action="/#" onSubmit={this.submitCity} style={{ width: '50%', flexWrap: 'nowrap' }}>
            <FormControl type="search" placeholder="Введите название города на английском" className="mr-sm-2" ref={this.textInput} style={{ width: '100%' }} />
            <Button variant="outline-primary" type="submit" value="Отправить">Поиск</Button>
          </Form>
        </Navbar>
      </div>
    );
  }
}

SearchForm.propTypes = { updateCityName: PropTypes.func };
