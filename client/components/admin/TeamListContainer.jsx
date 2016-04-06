import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import TeamList from './TeamList.jsx';

export default createContainer( ({ params }) => {

    const teamsHandle = Meteor.subscribe('teams.all');
    const loading = !teamsHandle.ready();

    const teams = Teams.find({}, {sort: {"profile.firstname": 1, "profile.lastname": 1}});

    return {
        loading,
        teams: !loading ? teams.fetch() : [],
    };

}, TeamList);