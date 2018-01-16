import React, { Component } from 'react';

export default class Video extends Component {
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
