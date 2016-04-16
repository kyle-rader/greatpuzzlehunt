# Decoding QR Codes on mobile browsers (using React)
Somewhere in your UI you have an input tag.
```
<input className="upload" type="file" accept="image/*" ref="qrUpload" onChange={this.handleQRupload}/>
```

Setup the decode callback.  I do this in my `componentDidMount()` function.
```
componentDidMount() {
    qrcode.callback = (data) => {
        if (data === 'error decoding QR Code') {
            this.setState({
                currentPuzzleId: this.state.currentPuzzleId,
                currentTeamId: null,
                error: 'Bad QR Photo! Try Again :)'
            });
        } else {
            this.setState({
                currentPuzzleId: this.state.currentPuzzleId,
                currentTeamId: data,
                error: null
            });
        }
    };
},
```
Your phone can take a picture to upload on clicking the input.

I then handle this upload event with a custom function on my React component.
```
handleQRupload(event) {
    let input = this.refs.qrUpload;

    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            qrcode.decode(e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
},
```