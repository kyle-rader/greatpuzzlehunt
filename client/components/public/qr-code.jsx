import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import QR from 'qrcode.react';

QRCode = class QRCode extends Component {

  constructor(props) {
    super(props);
    this.state = {
        encode: 'Hello QR Codes!',
        size: 128,
    };
  }

  handleEncodeChange(event) {
    this.setState({encode: event.target.value});
  }

  handleSizeChange(event) {
    this.setState(_.extend(this.state, {size: event.target.value}));
  }

  handleQRupload(event) {
    let input = this.refs.qrUpload;
    console.log(input);

    if (input.files && input.files[0]) {
      var reader = new FileReader();
      let preview = $(this.refs.qrPreview);

      reader.onload = function (e) {
        preview.attr('src', e.target.result);
        preview.removeClass('hidden');
        qrcode.decode(e.target.result);
      }

      reader.readAsDataURL(input.files[0]);
    }
  }

  componentDidMount() {
    qrcode.callback = (data) => {
      console.log(data);
      alert(data);
    };
  }

  render() {
    return (
    <div className="ui container">

      <PuzzlePageTitle title="QR Encoder" subTitle="" />

      <div className="ui container">
        <h2>Why is this here?</h2>
        <p className="h4">The way the puzzle hunt works is this: You and your team will log in on your phones.  Your team page is going to show a QR code like the one below.
          You will travel to a puzzle station where a volunteer will also be logged into the system on their phone.  The volunteer is going to scan your team QR code and then
          start your puzzle time while handing you a puzzle packet of materials!
        </p>
        <p className="h4">When they start that timer your team's page will switch to a form input where you can guess at the answer and get your hints (at a time penalty).  When you answer correctly it will say "Congratulations!"
          and take you back to your team QR code so you can move on to the next puzzle station.
        </p>
        <p className="h4">QR codes are just a way of encoding arbitrary data.  Below we have an example for you to play with!<br/>Try typing something else in!  (Try typing in a lot of characters)</p>

        <QR value={this.state.encode} size={parseInt(this.state.size)} />

        <br/>
        <div className="ui form">
          <div className="field">
            <input type="text" defaultValue={this.state.encode} onChange={(e) => this.handleEncodeChange(e)} />
          </div>
          <div className="field">
            <input type="text" defaultValue={this.state.size} onChange={(e) => this.handleSizeChange(e)} />
          </div>
        </div>

        <br/>
        <form className="ui form">
          <div className="field">
            <input className="ui blue fluid button" type="file" accept="image/*" ref="qrUpload" onChange={(e) => this.handleQRupload(e)}/>
          </div>
          <img className="ui hidden image" ref="qrPreview" src="#" alt="QR Code Image" />
        </form>
      </div>
    </div>
    );
  }
}
