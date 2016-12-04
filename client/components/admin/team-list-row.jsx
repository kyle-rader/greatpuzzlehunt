import React from 'react';
import { Meteor } from 'meteor/meteor';

AdminTeamListRow = React.createClass({

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

    getName() {

        let facultyTeam;
        let studentTeam;
        if (this.data.members) {
            let facultyCnt = 0;
            let studentCnt = 0;

            for (let i = 0; i < this.data.members.length; i++) {
                facultyCnt += (this.data.members[i].emails[0].address.indexOf('@wwu.edu') >= 0) ? 1 : 0;
                studentCnt += (this.data.members[i].emails[0].address.indexOf('@students') >= 0) ? 1 : 0;
            }

            if (facultyCnt > 0) {
                facultyTeam = (
                    <i className="large blue university icon"></i>
                );
            }
            if (studentCnt > 0) {
                studentTeam = (
                    <i className="large gray student icon"></i>
                );
            }
        }

        return (
        <h3 className="ui header">
            <div className="content">
                {this.props.team.name} {facultyTeam} {studentTeam}
                <div className="sub header">
                    {this.props.team.members.length} Member{this.props.team.members.length > 1 ? 's' : ''}
                </div>
            </div>
        </h3>
        );
    },

    getMembers() {
        if (!this.data.members) return null;

        return this.data.members.map((member) => {
            let owner = member._id === this.props.team.owner ?
                <i className="bullhorn blue icon"></i> : null;

            return (
                <div className="item" key={member._id}>
                    <strong>{owner}&nbsp;{member.profile.displayname}</strong> &nbsp;|&nbsp; {member.emails[0].address} &nbsp;|&nbsp; {member.profile.phone}
                </div>);
        });
    },

    render() {

        return (
        <div className="ui segment team-listing">
            {this.getName()}

            <div className="ui items">
                { this.getMembers() }
            </div>

        </div>
        );
    }
});

