import React, { Component } from 'react';

export default class Vimeo extends Component {
  render() {
    return <div ref="embedded-video" className="ui embed"></div>;
  }

  componentDidMount() {
    const video = $(this.refs['embedded-video']);

    video.embed({
      source      : this.props.source,
      id          : this.props.vimeo_id,
    });

    $('html, body').scrollTop(0);
  }
}
