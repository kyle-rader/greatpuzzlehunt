import React from 'react';
import { Meteor } from 'meteor/meteor';
import FloaterListContainer from './FloaterListContainer.jsx';

Floaters = React.createClass({
  render() {
    return(
      <div className="custom-bg red-square">
          <br/>
          <div className="ui raised segment transparent-bg">
              <h3 className="ui centered orange header">Free Puzzlers</h3>
                <FloaterListContainer />
          </div>
      </div>
    );
  }
});
