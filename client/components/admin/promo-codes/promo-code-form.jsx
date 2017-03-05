import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Container, Form, Input, Icon, Header  } from 'semantic-ui-react';

PromoCodeForm = class PromoCodeForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { promoCode } = nextProps;
    this.setState({
      name: promoCode.name,
      code: promoCode.code,
      units: promoCode.units,
    });
  }

  render() {
    return (
      <Form onSubmit={(e, data) => this._onSave(e, data) }>
        <Form.Group widths='equal'>
          <Form.Input name='name' label='Name' placeholder='Promo Name'/>
          <Form.Input name='code' label='Promo Code' placeholder='Promo Code'/>
          <Form.Input name='units' label='Units' placeholder='Promo Name'/>
          <Form.Input name='used' label='Used' defaultValue={ this.props.promoCode.used } readOnly />
        </Form.Group>
        <Form.Group>
          <Form.Button basic color='green' content='Save'/>
          <Form.Button basic color='red' content='Remove' onClick={ (e) => this._onRemove(e) }/>
        </Form.Group>
        { this._errorMessage() }
      </Form>
    );
  }

  _onSave(e, data) {
    e.preventDefault();
  }

  _onRemove(e) {
    e.preventDefault();
  }

  _errorMessage() {
    if (!this.state.error) return null;
    return <Message error content={ this.state.error.message }/>;
  }

}

PromoCodeForm.propTypes = {
  promoCode: PropTypes.object.isRequired,
};
