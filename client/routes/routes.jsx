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

      </Route>

      <Route path="*" component={Home}/>
    </Route>
  </Router>
);
