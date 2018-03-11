import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import m from 'moment';

class TimedComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBefore: this._showBefore(),
    }
    this.updateInterval = Meteor.setInterval(() => {
      this.setState({ showBefore: this._showBefore() });
    }, 1000);
  }

  _showBefore() {
    return m(this._now()).isBefore(this.props.timeout);
  }

  _now() {
    return m(this.props.now);
  }

  render() {
    const { showBefore } = this.state;
    const { beforeComp, afterComp } = this.props;
    const content = showBefore ? beforeComp : afterComp;
    return <div>{content}</div>;
  }

  componentWillUnmount() {
    Meteor.clearInterval(this.updateInterval);
  }
}

const validCompPropTypes = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.string,
]);

TimedComp.propTypes = {
  beforeComp: validCompPropTypes.isRequired,
  afterComp: validCompPropTypes.isRequired,
  timeout: function(props, propName, componentName) {
    if (!m.isMoment(props[propName])) {
      return new Error(`Invalid propType "timeout" must be a Moment object!`);
    }
  },
};

export default TimedComp;
