import React from 'react';
import { Meteor } from 'meteor/meteor';
import TeamListRowContainer from './TeamListRow.jsx';

export default class TeamList extends React.Component {

    getTeamList() {
        return this.props.teams.map((team) => {
            return (
                <TeamListRowContainer key={team._id} params={{id: team._id}} team={team} />
            );
        });
    }

    search(event) {
        // let search = event.target.value;
        // let userList = $(this.refs.userlist);
        // userList.find(`tr:contains(${search})`).each(function() {
        //     $(this).show();
        // });
        // userList.find(`tr:not(:contains(${search}))`).each(function() {
        //     $(this).hide();
        // });
    }

    componentDidMount() {
        // $(this.refs.controlRow)
        //     .visibility({
        //         type   : 'fixed',
        //         offset : 35,
        //     });
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
                    <th>Password</th>
                    <th>Members</th>
                    <th>Actions</th>
                </tr>
            </thead>
          <tbody ref="teamlist">
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