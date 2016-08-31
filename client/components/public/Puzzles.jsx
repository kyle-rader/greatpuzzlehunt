import React, { Component } from 'react';

Puzzles = class Puzzle extends Component {

  render() {
    return (
      <div className="ui container">
        <PuzzlePageTitle title="2016 Puzzles"/>

        <div className="ui padded grid">
          <div className="one column stacking row">
            <div className="column">
              <div className="ui padded basic segment">
                <div className="ui stackable dark-blue grid">
                  <div className="two column row">
                    <div className="column">
                      <h2>Cite Unseen</h2>
                      <p>Visual literature</p>
                      <a className="ui dark-blue button" target="_blank" href="/puzzles/Cite Unseen FINAL.pdf">Download</a>
                    </div>
                    <div className="column">
                      <h2>Fold and Behold</h2>
                      <p>Folding and geometry</p>
                      <a className="ui dark-blue button" target="_blank" href="/puzzles/Fold AND Behold FINAL.pdf">Download</a>
                    </div>
                  </div>
                  <div className="two column row">
                    <div className="column">
                      <h2>Stop the Clock</h2>
                      <p>Visual numbers, numerals, and logic</p>
                      <a className="ui dark-blue button" target="_blank" href="/puzzles/Stop the Clock FINAL.pdf">Download</a>
                    </div>
                    <div className="column">
                      <h2>Time will Tell</h2>
                      <p>Music and melody</p>
                      <a className="ui dark-blue button" target="_blank" href="/puzzles/Time will tell FINAL.pdf">Download</a>
                    </div>
                  </div>
                  <div className="two column row">
                    <div className="column">
                      <h2>Meta Puzzle</h2>
                      <p>A puzzle that relies on you to solve the first four :)</p>
                      <a className="ui dark-blue button" target="_blank" href="/puzzles/Meta Puzzle FINAL.pdf">Download</a>
                    </div>
                    <div className="column">

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
