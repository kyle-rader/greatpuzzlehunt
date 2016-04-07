import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class TeamList extends React.Component {

    getTeamList() {
        return this.props.teams.map((team) => {
            return (
                <TeamListRow key={team._id} team={team} />
            );
        });
    }

    search(event) {
        let search = event.target.value;
        let teamList = $(this.refs.teamList);
        teamList.find(`tr:contains(${search})`).each(function() {
            $(this).show();
        });
        teamList.find(`tr:not(:contains(${search}))`).each(function() {
            $(this).hide();
        });
    }

    componentDidMount() {
    }

    render() {
        // Don't do anything if loading. 
        if (this.props.loading) {
            return (
                <div>Loading Teams...</div>
            );
        }

        return (
        <table className="ui compact celled table">
            <thead ref="controlRow" className="full-width control-row">
                <tr>
                    <th colSpan="4">
                        <div className="ui grid">
                            <div className="three wide column">
                                <div className="ui large blue fluid label">
                                    <i className="users icon"></i>
                                    &nbsp;
                                    {this.props.teams.length} Teams
                                </div>
                            </div>
                            <div className="ten wide column">
                                <div className="ui fluid right icon input">
                                    <input type="text" placeholder="Search" onChange={this.search.bind(this)}/>
                                    <i className="search icon"></i>
                                </div>
                            </div>
                            <div className="three wide column">
                                
                            </div>
                        </div>
                    </th>
                </tr>
            </thead>
            <thead className="full-width">
                <tr>
                    <th>Name</th>
                    {/*<th>Password</th>*/}
                    <th colSpan="2">Members</th>
                    {/*<th>Actions</th>*/}
                </tr>
            </thead>
          <tbody ref="teamList">
            { this.getTeamList() }
          </tbody>
          <tfoot className="full-width">
            <tr>
              <th colSpan="4">
                
              </th>
            </tr>
          </tfoot>
        </table>
        );
    }
}

TeamList.propTypes = {
    loading: React.PropTypes.bool,
    teams: React.PropTypes.array
};