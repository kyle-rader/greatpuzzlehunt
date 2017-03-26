import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Form, Message, Image } from 'semantic-ui-react';
import { cloneDeep } from 'lodash';

class HintEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hints: cloneDeep(props.puzzle.hints),
    };
  }

  render() {
    return (
      <div>
        <Form.Group key='add_hint_btn'>
          <Form.Button basic content='Add Hint' icon='plus' labelPosition='right' onClick={ (e) => this._addhint(e) }/>
        </Form.Group>
        { this._hintInputs() }
      </div>
    );
  }

  _addhint(e) {
    e.preventDefault();
    const { hints } = this.state;
    hints.push({
      description: 'New Hint',
      image: {
        id: '',
        url: '',
      },
    });
    this.setState({ hints });
  }

  _hintInputs() {
    return this.state.hints.map((hint, i) => {
      const name = `hint_${i}_description`;
      return (
        <Form.Group key={ `${this.props.puzzle._id}_${name}`} widths='equal'>
          <Form.Input
            label='Description'
            value={ this.state.hints[i].description }
            onChange={ (e) => {
              const { hints } = this.state;
              hints[i].description = e.target.value;
              return this.setState({ hints });
            }}
          />
          <Form.Select
            label='Image'
            options={[]}
            placeholder='Image'
            value={ this.state.hints[i].image.id }
            onChange={ (e, { value }) => {
              const { hints } = this.state;
              hint[i].image = {
                id: value,
                // TODO: Set the URL by looking it up in images map.
                url: this.state.images[value],
              };
              this.setState({ hints });
            }}
          />
        </Form.Group>
      );
    });
  }
}

HintEditor.propTypes = {
  puzzle: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default HintEditor;
