import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import TeamListRow from './TeamListRow.jsx';

export default createContainer( ({ team }) => {

    const membersHandle = Meteor.subscribe('team.members', team._id);
    
    const loading = !membersHandle.ready();

    const members = Meteor.users.find({"profile.teamId": team._id}, {sort: {name: 1}});

    return {
        loading,
        team,
        members: !loading ? members.fetch() : []
    }; 

}, TeamListRow);