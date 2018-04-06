import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import makeAuthed from '../components/app/imports/make-authed.js';

export const renderRoutes = () => (
  <Router history={browserHistory}>

    <Route path='/' component={App}>

      <IndexRoute component={Home}/>
      <Route path='teams-list' component={PublicTeamList}/>
      <Route path='gallery' component={Gallery}/>
      <Route path='contact' component={Contact}/>
      <Route path='puzzles' component={SamplePuzzles}/>
      <Route path='faq' component={FAQ}/>
      <Route path='qrcode' component={QRCode}/>
      <Route path='register' component={Register}/>
      <Route path='rules' component={ RulesOfPlay }/>

      <Route path='login' component={Login}/>
      <Route path='requestpasswordreset' component={RequestPasswordReset}/>
      <Route path='passwordreset/:token' component={PasswordReset}/>
      <Route path='redeem' component={RedeemTicket}/>

      <Route path='profile' component={Profile}/>

      <Route path='game' component={makeAuthed('user')}>
        <IndexRoute component={ Game }/>
      </Route>

      <Route path='team' component={makeAuthed('user')}>
        <IndexRoute component={Team}/>
        <Route path='create' component={TeamCreator}/>
        <Route path='join' component={TeamBrowser}/>
      </Route>

      <Route path='looking-for-team' component={makeAuthed('user')}>
        <IndexRoute component={ LookingForTeam }/>
      </Route>

      {/* Volunteer Routes */}
      <Route path='volunteer' component={makeAuthed('volunteer')}>
        <IndexRoute component={ Volunteer }/>
        <Route path='time/:teamId/:puzzleId' component={VolunteerTimer}/>
        <Route path='/game-progress' component={GameProgress}/>
      </Route>

      {/* Admin Routes */}
      <Route path='admin' component={makeAuthed('admin')}>
        <IndexRoute component={AdminUsers} />
        <Route path='users' component={AdminUsers} />
        <Route path='transactions' component={AdminTransactions} />
        <Route path='sponsors' component={AdminSponsors} />
        <Route path='puzzles' component={AdminPuzzles} />
        <Route path='gamestate' component={AdminGamestate} />
        {/* <Route path='email' component={AdminEmailContainer}>
          <IndexRoute component={AdminEmailLists}/>
        </Route> */}
      </Route>

      <Route path='*' component={Home}/>
    </Route>
  </Router>
);
