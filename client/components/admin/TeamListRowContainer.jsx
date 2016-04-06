import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import TeamListRow from './TeamListRow.jsx';

export default createContainer( ({ params }) => {

    const { id } = params;

    console.log('team container:', id);

    const membersHandle = Meteor.subscribe('team.members', id);
    
    const loading = !membersHandle.ready();

    return {
        loading,
        members: !loading ? membersHandle.find({"profile.teamId": id}).fetch() : []
    };

}, TeamListRow);