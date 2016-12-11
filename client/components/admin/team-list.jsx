import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

AdminTeamList = class AdminTeamList extends Component {
    _getTeamList() {
        return this.props.teams.map((team) => {
            return (
                <AdminTeamListRow key={team._id} team={team} />
            );
        });
    }

    _search(event) {
        let search = event.target.value;

        $(`div.ui.team-listing:contains(${search})`).each(function() {
            $(this).show();
        });

        $(`div.ui.team-listing:not(:contains(${search}))`).each(function() {
            console.log('Hide');
            $(this).hide();
        });
    }

    render() {

        if (this.props.teams) {
            return (
            <div className="ui basic segment">
                <div className="ui grid">
                    <div className="six wide column">
                        <div className="ui large blue label">
                            <i className="users icon"></i>
                            &nbsp;
                            {this.props.teams.length} Teams
                        </div>
                    </div>
                    <div className="ten wide column">
                        <div className="ui fluid right icon input">
                            <input type="text" placeholder="Search" onChange={this._search}/>
                            <i className="search icon"></i>
                        </div>
                    </div>
                    <div className="three wide column">

                    </div>
                </div>

                { this._getTeamList() }

            </div>
            );
        } else {
            return <Loading />;
        }
    }
}

AdminTeamList = createContainer((props) => {
  const teamsHandle = Meteor.subscribe('admin.teams');
  const loading = !teamsHandle.ready();

  const options = {};

  const teams = Teams.find({}, options).fetch();

  return {
    loading,
    teams,
  };
}, AdminTeamList);
