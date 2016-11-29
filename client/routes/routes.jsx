import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

export const renderRoutes = () => (
  <Router history={browserHistory}>

    <Route path="/" component={App}>

      {/* Public Routes */}
      <IndexRoute component={Home}/>
      <Route path="gallery" component={Gallery}/>
      <Route path="contact" component={Contact}/>
      <Route path="puzzles" component={Puzzles}/>
      <Route path="info" component={Info}/>
      <Route path="qrcode" component={QRCode}/>

      {/* Authentication Routes */}
      <Route path="login" component={Login}/>
      <Route path="register" component={Register}/>
      <Route path="requestpasswordreset" component={RequestPasswordReset}/>
      <Route path="passwordreset/:token" component={PasswordReset}/>

      {/* Authed Routes */}
      <Route path="profile" component={Profile}/>

      {/* Admin Routes */}
      <Route path="admin" component={Admin}>
        <IndexRoute component={UserList} />
        <Route path="users" component={UserList} />
        <Route path="teams" component={TeamList} />
        <Route path="puzzles" component={PuzzleDashboard} />
        <Route path="email" component={BulkEmail} />
        <Route path="game" component={GamePlay} />
        <Route path="scoring" component={Scoring} />
      </Route>

      <Route path="*" component={Home}/>
    </Route>
  </Router>
);
