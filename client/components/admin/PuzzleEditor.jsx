import React from 'react';
import { Meteor } from 'meteor/meteor';

PuzzleEditor = React.createClass({

    getInitialState() {
        return {

        };
    },

    handleUpload(event) {
        let input = this.refs.imageUpload;

        if (input.files && input.files[0]) {
            let reader = new FileReader();
            let preview = $(this.refs.qrPreview);
            
            reader.onload = function (e) {
                preview.attr('src', e.target.result);
                preview.removeClass('hidden');
            }
            
            reader.readAsDataURL(input.files[0]);

            Images.insert(input.files[0], function (err, fileObj) {
              if (err) {
                 console.log(err);
              } else {
                 // handle success depending what you need to do
                let userId = Meteor.userId();
                let imageURL = `/cfs/files/images/${fileObj._id}`;

                Meteor.call('addImage', {
                    path: imageURL
                }, (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        alert('Saved url');
                    }
                });

              }
            });
        }
    },

    render() {

        return (
            <form className="ui form">
                <div className="fluid field">
                    <input ref="name" type="text" placeholder="Puzzle Name" defaultValue={this.props.puzzle.name} />
                </div>
                <div className="field">
                    <input className="ui olive fluid button" type="file" accept="image/*" ref="imageUpload" onChange={this.handleUpload}/>
                </div>
                <img className="ui hidden image" ref="qrPreview" src="#" alt="QR Code Image" />
            </form>
        );
    }

});

export default PuzzleEditor;