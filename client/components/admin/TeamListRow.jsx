import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class TeamListRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false
        };
    }

    enableEdit(user) {
        this.setState({editMode: true});
    }

    saveTeam() {
        // let name = this.refs.firstname.value;
        // let password = this.refs.lastname.value;

        // let editBtn = $(this.refs.editBtn);

        // Meteor.call('userAdminUpdate', {
        //     _id: this.props.user._id,
        //     firstname: firstname,
        //     lastname: lastname,
        //     username: username,
        //     email: email
        // }, (err, result) => {
        //     if (err) {
        //         console.log(err);
        //         editBtn.attr('data-content', 'Failed to save user! 😰');
        //     } else {
        //         editBtn.attr('data-content', `${firstname} saved! 😀`);
        //     }

        //     editBtn.popup({
        //         on: 'manual'
        //     }).popup('show');
        //     setTimeout(() => {
        //         editBtn.popup('hide');
        //     }, 3000);
        // });
        // this.setState({editMode: false});
    }

    deleteTeam(event) {
    }

    getName() {
        if (this.state.editMode) {
            return (
            <td>
                
            </td>);

        } else {
            return (
            <td>
                {this.props.team}
            </td>);
        }
    }

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
    }

    getEditButton() {
        if (this.state.editMode) {
            return (<div ref="editBtn" className="ui green basic button" title="Edit User" onClick={this.saveTeam.bind(this)}><i className="save icon"></i></div>);
        } else {
            return (<div ref="editBtn" className="ui green basic button" title="Save User" onClick={this.enableEdit.bind(this)}><i className="pencil icon"></i></div>);
        }
    }

    componentWillReceiveProps() {
        this.setState({editMode: false});
    }

    render() {

        console.log(this.props);

        if (this.props.loading) {
            return (
                <tr>
                    <td colSpan="4">Loading ...</td>
                </tr>
            );
        }

        return (
        <tr>
            {this.getName()}

            {this.getPassword()}

            <td></td>
            
            <td>
                <div className="ui three icon tiny compact buttons">
                    {this.getEditButton()}
                    <div className="ui disabled red basic button" title="Delete User" onClick={this.deleteTeam.bind(this)}>
                        <i className="trash icon"></i>
                    </div>
                </div>
            </td>
        </tr>
        
        );
    }
}

TeamListRow.propTypes = {
    loading: React.PropTypes.bool,
    team: React.PropTypes.object,
    members: React.PropTypes.array
};
