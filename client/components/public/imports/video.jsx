import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Video extends Component {
  render() {
    return <div ref="embedded-video" className="ui embed"></div>;
  }

  componentDidMount() {
    const video = $(this.refs['embedded-video']);

    video.embed({
      source      : this.props.source,
      id          : this.props.videoId,
    });

    $('html, body').scrollTop(0);
  }
}

Video.PropTypes = {
  source: PropTypes.string.isRequired,
  videoId: PropTypes.string.isRequired,
};

export default Video;
