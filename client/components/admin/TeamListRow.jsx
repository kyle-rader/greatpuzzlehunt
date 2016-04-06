import React from 'react';
import { Meteor } from 'meteor/meteor';

TeamListRow = React.createClass({

    propTypes: {
        loading: React.PropTypes.bool,
        team: React.PropTypes.object,
        members: React.PropTypes.array
    },

    getInitialState() {
        return {
            editMode: false
        };
    },

    mixins:[ReactMeteorData],
    getMeteorData() {
        let data = {};
        let membersHandle = Meteor.subscribe('team.members', this.props.team._id);

        if (membersHandle.ready()) {
            data.members = Meteor.users.find({"profile.teamId": this.props.team._id}).fetch();
        }
        return data;
    },

    enableEdit(user) {
        this.setState({editMode: true});
    },

    saveTeam() {
    },

    deleteTeam(event) {
    },

    getName() {
        if (this.state.editMode) {
            return (
            <td>
                
            </td>);

        } else {
            return (
            <td>
                {this.props.team.name}
            </td>);
        }
    },

    getPassword() {
        if (this.state.editMode) {
            return (
            <td>
                
            </td>);
        } else {
            return (
            <td>
                <div className="ui input">
                    <input type="password" disable defaultValue={this.props.team.password}/>
                </div>
            </td>);
        }
    },

    getMembers() {
        if (!this.data.members) return null;

        return this.data.members.map((member) => {
            return <li key={member._id}><strong>{member.profile.displayname}</strong> | {member.emails[0].address} | {member.profile.phone}</li>
        });
    },

    getEditButton() {
        if (this.state.editMode) {
            return (<div ref="editBtn" className="ui green basic button" title="Edit User" onClick={this.saveTeam}><i className="save icon"></i></div>);
        } else {
            return (<div ref="editBtn" className="ui green basic button" title="Save User" onClick={this.enableEdit}><i className="pencil icon"></i></div>);
        }
    },

    componentDidMount() {
        //console.log(`Team mounted`, this.props);
    },

    componentWillReceiveProps() {
        this.setState({editMode: false});
    },

    render() {

        return (
        <tr>
            {this.getName()}

            {this.getPassword()}

            <td>
                <div className="ui list">
                    { this.getMembers() }
                </div>
            </td>
            {/*
            <td>
                <div className="ui three icon tiny compact buttons">
                    {this.getEditButton()}
                    <div className="ui disabled red basic button" title="Delete User" onClick={this.deleteTeam}>
                        <i className="trash icon"></i>
                    </div>
                </div>
            </td>
            */}
        </tr>
        );
    }
});

