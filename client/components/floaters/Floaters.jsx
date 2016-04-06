import React from 'react';
import { Meteor } from 'meteor/meteor';
import FloaterListContainer from './FloaterListContainer.jsx';

Floaters = React.createClass({
  render() {
    return(
      <div className="custom-bg red-square">
          <br/>
          <div className="ui raised segment transparent-bg">
              <h3 className="ui centered violet header">Free Puzzlers</h3>

              <div className="ui container">
                  <FloaterListContainer />
              </div>

          </div>
      </div>
    );
  }
});
