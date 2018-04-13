import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import makeAuthed from '../components/app/imports/make-authed.js';

export const renderRoutes = () => (
  <Router history={browserHistory}>

    <Route path='/' component={App}>


      {/* Home/Public Routes */}
      <IndexRoute component={Home}/>
      <Route path='teams-list' component={PublicTeamList}/>
      <Route path='gallery' component={Gallery}/>
      <Route path='contact' component={Contact}/>
      <Route path='puzzles' component={SamplePuzzles}/>
      <Route path='faq' component={FAQ}/>
      <Route path='qrcode' component={QRCode}/>
      <Route path='register' component={Register}/>
      <Route path='rules' component={ RulesOfPlay }/>

      {/* Authentication Routes */}
      <Route path='login' component={Login}/>
      <Route path='requestpasswordreset' component={RequestPasswordReset}/>
      <Route path='passwordreset/:token' component={PasswordReset}/>
      <Route path='redeem' component={RedeemTicket}/>

      {/* User Routes */}
      <Route path='profile' component={Profile}/>

      {/* Game Routes */}
      <Route path='game' component={makeAuthed('user')}>
        <IndexRoute component={ Game }/>
      </Route>

      {/* Team Routes */}
      <Route path='team' component={makeAuthed('user')}>
        <IndexRoute component={Team}/>
        <Route path='create' component={TeamCreator}/>
        <Route path='join' component={TeamBrowser}/>
        <Route path='checkin' component={TeamCheckin}/>
      </Route>

      <Route path='looking-for-team' component={makeAuthed('user')}>
        <IndexRoute component={ LookingForTeam }/>
      </Route>

      {/* Volunteer Routes */}
      <Route path='volunteer' component={makeAuthed('volunteer')}>
        <IndexRoute component={ Volunteer }/>
        <Route path='time/:teamId/:puzzleId' component={VolunteerTimer}/>
        <Route path='/game-progress' component={GameProgress}/>

        <Route path='checkin/:teamId' component={VolunteerTeamCheckIn}/>
      </Route>

      {/* Admin Routes */}
      <Route path='admin' component={makeAuthed('admin')}>
        <IndexRoute component={AdminUsers} />
        <Route path='users' component={AdminUsers} />
        <Route path='transactions' component={AdminTransactions} />
        <Route path='leaderboard' component={AdminLeaderboard} />
        <Route path='sponsors' component={AdminSponsors} />
        <Route path='puzzles' component={AdminPuzzles} />
        <Route path='gamestate' component={AdminGamestate} />
      </Route>

      <Route path='*' component={Home}/>
    </Route>
  </Router>
);
