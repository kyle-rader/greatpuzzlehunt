import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

Gallery = class Gallery extends Component {

  _getImages() {

    let images = [
        //"gathering.jpg",
        "gathering2.jpg",
        "fun-in-the-sun.jpg",
        "gathering5.jpg",
        "puzzle-sample.jpg",
        "scattering1.jpg",
        "gathering3.jpg",
        "scattering2.jpg",
        "scattering3.jpg",
        "scattering4.jpg",
        "station1.jpg",
        "team-SPEL.jpg",
        "team-artic-foxes.jpg",
        "team-artimus.jpg",
        "team-boo-crew.jpg",
        "team-church-of-put-it-backism.jpg",
        "team-common-vikings.jpg",
        "team-cool-team.jpg",
        "team-e-equals-mchammer.jpg",
        "team-finesse.jpg",
        "team-french-toast-mafia.jpg",
        "team-grandmas-gingersnaps.jpg",
        "team-grey-council.jpg",
        "team-grunts-for-grants.jpg",
        "team-haydn-in-plain-sight.jpg",
        "team-honorable-mention.jpg",
        "team-lil-pickles.jpg",
        "team-llamageddon.jpg",
        "team-mascuffins.jpg",
        "team-math-383-section-1.jpg",
        "team-math-friends-forever.jpg",
        "team-meme-team.jpg",
        "team-mino-6.28-ri.jpg",
        "team-misfit-toys.jpg",
        "team-miston-lion-and-jbear-and-friends.jpg",
        "team-mod.jpg",
        "team-no-mba-left-behind.jpg",
        "team-odd-number-squared-mod-8.jpg",
        "team-periodic-table-dancers.jpg",
        "team-puddlemere-united.jpg",
        "team-puzzlehaven.jpg",
        "team-puzzlightyear-of-star-command.jpg",
        "team-saxaphone-bugs-2.jpg",
        "team-saxaphone-bugs.jpg",
        "team-secular-exodus.jpg",
        "team-sharon.jpg",
        "team-sherlock-and-watson.jpg",
        "team-team-ohana.jpg",
        "team-tears-of-madison.jpg",
        "team-the-fellowship.jpg",
        "team-the-fire-nation.jpg",
        "team-the-flying-pigs.jpg",
        "team-the-jones-pod.jpg",
        "team-the-lazy-wombats.jpg",
        "team-the-plastics.jpg",
        "team-the-purple-penguins.jpg",
        "team-the-puzzle-pirates.jpg",
        "team-the-trophy-husbands.jpg",
        "team-theres-waldo.jpg",
        "team-three-legged-cobras.jpg",
        "team-vicious-and-delicious.jpg",
        "team-we-got-an-a-in-145.jpg",
        "team-welp.jpg",
        "team-werewolf-bar-mitzvah.jpg",
        "team-whales-in-space-2.jpg",
        "team-whales-in-space.jpg",
        "team-will-become-total-puzzle-nerds-in-exchange-for-extra-credit.jpg",
        "team-woodring-college-enthusiasts.jpg",
        "team-wwu-sacnas.jpg",
        "team-wwu-tennis.jpg",
        "teams-on-stairs.jpg",
        "volunteers1.jpg",
        "volunteers2.jpg",
        "volunteers3.jpg",
        "volunteers4.jpg",
        "gathering4.jpg",
        //"volunteers5.jpg"
    ];

    return images.map((image) => (
      <div className="column" key={image}>
          <img className="ui image" src={`/img/hunt2016/${image}`} key={image} title={image}/>
      </div>)
    );
  }

  componentDidMount() {
    $('html, body').scrollTop(0);
  }

  render() {
      return (
      <div className="ui container">

        <PuzzlePageTitle title="Gallery" subTitle="Photo Credit: Gabrielle Poncz" />

        <div className="ui stackable two column grid">
            {this._getImages()}
        </div>

        <br/>
      </div>
    );
  }

}
