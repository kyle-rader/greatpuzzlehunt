import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import { Form, Message, Input, Popup, Icon, Checkbox, Confirm, Segment } from 'semantic-ui-react';
import { DIVISION_TYPES } from "./imports/team-helpers"

TeamEditor = class TeamEditor extends Component {

  constructor(props) {
    super(props);
    this.state = this._getStateFromProps(props);
    this.state.showConfirm = false;

    this.divisions = [...DIVISION_TYPES];

    this._handleChange = (e, { name: dataName, value: dataValue } = {}) => {
      const name = e.target.name || dataName;
      const value = e.target.value || dataValue;
      this.setState({ [name]: value });
    };
  }

  _getStateFromProps(props) {
    const { team } = props;
    if (team) {
      return {
        name: team.name || '',
        password: team.password || '',
        division: team.division || null,
        lookingForMembers: (team.lookingForMembers || false),
        checkedIn: team.checkinConfirmed,
      };
    }
    return { name: '', password: '', division: null, lookingForMembers: false, checkedIn: false};
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this._getStateFromProps(nextProps));
  }

  render() {
    return (
      <Form widths='equal' onSubmit={(e) => this._saveTeam(e)}>

        {this._ncConfirmation()}

        { (this.state.checkedIn) ? <Message positive header="Check in Confirmed" content="Your team is checked in an cannot be updated anymore"/> : null}

        <Form.Group>
          <Form.Input name='name' label='Team Name' placeholder='Team Name' value={this.state.name} onChange={(e,d) => this._handleTextChange(e,d)} />
          <Form.Field>
            <label>Team Password <Popup trigger={<Icon name='question'/>} content='You can share your team password with your friends to let them join your team!'/></label>
            <Input name='password' placeholder='Team Password' value={this.state.password} onChange={(e, d) => this._handleTextChange(e, d)} />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <label>Team Division <br/><small>This determines your prize group</small></label>
          <br/>
          {this._renderDivisionRadio()}
        </Form.Field>
        <Form.Field>
          <label>Looking for members?</label>
          <Checkbox
            toggle
            name='lookingForMembers'
            label="Show this team as looking for members on the join team page. (This will display team creator's contact information)"
            checked={ this.state.lookingForMembers }
            onChange={ (e,data) => this._handleDataChange(e,data) }
          />
        </Form.Field>
        <Form.Button type='submit' icon='save' labelPosition='right' content={this.props.team ? 'Save Team' : 'Create Team'} disabled={this.state.checkedIn}/>
        <Message
         negative
         hidden={!this.state.error}
         icon="warning sign"
         onDismiss={() => this.setState({ error: null })}
         content={this.state.error ? this.state.error.reason : ''}
        />
        <Message
         positive
         hidden={!this.state.success || !this.props.showsSuccess}
         icon="check"
         content={this.state.success}
        />
      </Form>
    );
  }

  _renderDivisionRadio() {
    return this.divisions.map((division) => {
      const label = (
        <label>
          <strong>{division.text}</strong>
          <span> </span>
          <small>{division.description}</small>
        </label>
      );

      return <Form.Radio key={division.value}
        label={label}
        name='division'
        value={division.value}
        checked={this.state.division === division.value}
        onChange={(e, d) => this._handleDataChange(e, d)}/>
    });
  }

  _handleTextChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  _handleDataChange(e, data) {
    const { name, value, checked } = data;
    if(value === "noncompetitive"){
      this.setState({showConfirm: true});
    } else {
      this.setState({ [name]: (value || checked) });
    }
  }

  _ncConfirmation(){
    let { showConfirm } = this.state;
    return (
      <Confirm
        open={showConfirm}
        header="Are you sure?"
        content={<Segment basic style={{fontSize: '16px'}}>
          <p>Non-competitive teams do not have a time limit and are not eligible for prizes but for bragging rights, teams that solve at least one puzzle are recognized online for the number of puzzles completed!</p>
        </Segment>}
        confirmButton={`Yes, Non-Competitive`}
        cancelButton="Nevermind"
        onConfirm={() => this.setState({showConfirm: false, division: "noncompetitive" })}
        onCancel={() => this.setState({showConfirm: false})}
        size="large"
      />
    );
  }

  _saveTeam(e) {
    e.preventDefault();
    const data = this._teamData();

    Meteor.call('teams.upsert', data, (error, result) => {
      if (error) return this.setState({ error });
      this.setState({ success: 'Team Saved!', error: null });
      Meteor.setTimeout(() => this.setState({success: null}), 2000);
    });
  }

  _teamData() {
    const { team } = this.props;
    const { name, password, division, lookingForMembers } = this.state;
    return {
      name, password, division, lookingForMembers,
      _id: team ? team._id : undefined,
    };
  }
}

TeamEditor.propTypes = {
  team: PropTypes.any,
};
