import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

export const renderRoutes = () => (
  <Router history={browserHistory}>

    <Route path='/' component={App}>

      {/*
        * Public Routes
      */}

      <IndexRoute component={Home}/>
      <Route path='gallery' component={Gallery}/>
      <Route path='contact' component={Contact}/>
      <Route path='puzzles' component={Puzzles}/>
      <Route path='info' component={Info}/>
      <Route path='qrcode' component={QRCode}/>

      {/* Authentication Routes */}
      <Route path='login' component={Login}/>
      <Route path='register' component={Register}/>
      <Route path='requestpasswordreset' component={RequestPasswordReset}/>
      <Route path='passwordreset/:token' component={PasswordReset}/>

      <Route path='setup/:token' component={AccountSetup}/>

      {/*
        * Authed Routes
      */}

      <Route path='profile' component={Profile}/>

      <Route path='team'>
        <IndexRoute component={Team}/>
        <Route path='create' component={TeamCreator}/>
        <Route path='join' component={TeamBrowser}/>
      </Route>

      {/* Admin Routes */}
      <Route path='admin' component={Admin}>
        <IndexRoute component={AdminUserList} />
        <Route path='users' component={AdminUserList} />
        <Route path='teams' component={AdminTeamList} />
        <Route path='puzzles' component={PuzzleDashboard} />
        <Route path='email' component={BulkEmail} />
        <Route path='game' component={GamePlay} />
        <Route path='scoring' component={Scoring} />
      </Route>

      <Route path='*' component={Home}/>
    </Route>
  </Router>
);
