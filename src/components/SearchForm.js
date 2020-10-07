import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from '@material-ui/core';

export default class SearchForm extends Component {
  constructor() {
    super();
    this.submitCity = this.submitCity.bind(this);
    this.textInput = null;
  }

  submitCity(event) {
    event.preventDefault();
    this.props.updateCityName(this.textInput.value);
  }

  render() {
    return (
      <div>
        <form action="/#" onSubmit={this.submitCity}>
          <Input placeholder="Название города на английском" style={{ minWidth: '20%' }} inputRef={(ref) => { this.textInput = ref; }} inputProps={{ 'aria-label': 'description' }} />
          <Button variant="contained" color="primary" type="submit" value="Отправить" size="small">
            Показать
          </Button>
          {/* <button type="submit" value="Отправить">Показать</button> */}
        </form>
      </div>
    );
  }
}

SearchForm.propTypes = { updateCityName: PropTypes.func };
