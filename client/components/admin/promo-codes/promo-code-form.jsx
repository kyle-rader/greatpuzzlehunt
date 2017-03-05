import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Container, Form, Message  } from 'semantic-ui-react';

PromoCodeForm = class PromoCodeForm extends Component {

  constructor(props) {
    super(props);
    const { promoCode } = props;
    this.state = {
      error: null,
      name: promoCode.name,
      code: promoCode.code,
      units: promoCode.units,
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
          <Form.Input name='name' label='Name' placeholder='Promo Name' value={ this.state.name } onChange={ (e) => this._handleChange(e) }/>
          <Form.Input name='code' label='Promo Code' placeholder='Promo Code' value={ this.state.code } onChange={ (e) => this._handleChange(e) }/>
          <Form.Input name='units' label='Units' placeholder='Promo Name' value={ this.state.units } onChange={ (e) => this._handleChange(e) }/>
          <Form.Input name='used' label='Used' defaultValue={ this.props.promoCode.used } readOnly />
        </Form.Group>
        <Form.Group>
          <Form.Button basic color='green' content='Save'/>
          <Form.Button basic content='Remove' onClick={ (e) => this._onRemove(e) }/>
        </Form.Group>
        { this._errorMessage() }
      </Form>
    );
  }

  _onSave(e, data) {
    e.preventDefault();
    const id = this.props.promoCode._id;
    Meteor.call('promo_codes.update', id, {
      name: data.name,
      code: data.code,
      units: parseInt(data.units),
    }, (error, response) => {
      if (error) return this.setState({ error });
    });
  }

  _handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  _onRemove(e) {
    e.preventDefault();
    if (!confirm(`Are you sure you want to delete promo code ${this.state.name}?`)) return;

    const id = this.props.promoCode._id;
    Meteor.call('promo_codes.delete', id, (error, response) => {
      if (error) this.setState({error });
    });
  }

  _errorMessage() {
    if (!this.state.error) return null;

    return <Message icon='warning' color='red'
      content={ this.state.error.reason }
      onDismiss={ () => this.setState({ error: null }) }
    />;
  }

}

PromoCodeForm.propTypes = {
  promoCode: PropTypes.object.isRequired,
};

export default PromoCodeForm;
