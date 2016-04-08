import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import UserListContainer from './UserListContainer.jsx';
import TeamListContainer from './TeamListContainer.jsx';
import PuzzleDashboard from './PuzzleDashboard.jsx';

Admin = React.createClass({

    getInitialState() {
        return {
            pageComp: PuzzleDashboard //UserListContainer
        }
    },

    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            user: Meteor.user()
        };
    },

    canViewAdminPage() {
        if (this.data.user && (this.data.user.roles.indexOf('admin') < 0)) {
            FlowRouter.go('/team');
        }
    },

    componentWillUpdate() {
        this.canViewAdminPage();
    },

    componentWillMount() {
        this.canViewAdminPage();
    },

    componentDidMount() {
        $(this.refs.tabMenu).find('.item').tab();
    },

    setPage(targetPage) {
        this.setState({
            pageComp: targetPage
        });
    },

    render() {
        let pageComp = this.state.pageComp ? <this.state.pageComp /> : <div className="basic segment">Oops, no page found</div>;

        return (
            <div className="custom-bg red-square">
                <br/>
                <div className="ui raised segment transparent-bg">
                    <h3 className="ui violet center aligned header">Admin Panel</h3>
                    <div className="ui labeled icon menu">
                        <a className="item" onClick={this.setPage.bind(this, UserListContainer)}>
                            <i className="green user icon"></i>
                            Users
                        </a>
                        <a className="item" onClick={this.setPage.bind(this, TeamListContainer)}>
                            <i className="blue users icon"></i>
                            Teams
                        </a>
                        <a className="item" onClick={this.setPage.bind(this, PuzzleDashboard)}>
                            <i className="violet puzzle icon"></i>
                            Puzzles
                        </a>
                        <a className="item" onClick={this.setPage.bind(this, null)}>
                            <i className="red gamepad icon"></i>
                            The Game
                        </a>
                    </div>
                    {pageComp}
                </div>
            </div>
        );
    }
});

/*
Admin.propTypes = {
    list: React.PropTypes.object,
    ...
}
        
*/
