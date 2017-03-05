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
      <Route path='puzzles' component={Puzzles}/>
      <Route path='info' component={Info}/>
      <Route path='qrcode' component={QRCode}/>
      <Route path='register' component={Register}/>
      <Route path='volunteer' component={Volunteer}/>

      <Route path='login' component={Login}/>
      <Route path='requestpasswordreset' component={RequestPasswordReset}/>
      <Route path='passwordreset/:token' component={PasswordReset}/>

      <Route path='setup/:token' component={AccountSetup}/>

      <Route path='profile' component={Profile}/>

      <Route path='team' component={makeAuthed('user')}>
        <IndexRoute component={TeamManager}/>
        <Route path='create' component={TeamCreator}/>
        <Route path='join' component={TeamBrowser}/>
      </Route>

      {/* Admin Routes */}
      <Route path='admin' component={makeAuthed('admin')}>
        <IndexRoute component={AdminUsers} />
        <Route path='users' component={AdminUsers} />
        <Route path='teams' component={AdminTeamList} />
        <Route path='promo-codes' component={PromoCodesList} />
        <Route path='puzzles' component={PuzzleDashboard} />
        <Route path='email' component={BulkEmail} />
        <Route path='game' component={GameState} />
        <Route path='scoring' component={Scoring} />
      </Route>

      <Route path='*' component={Home}/>
    </Route>
  </Router>
);
