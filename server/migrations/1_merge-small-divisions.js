Migrations.add({
  version: 1,
  up: function() {
    Teams.update({
      division: { $in: ['high-school', 'post-secondary'] },
    }, {
      $set: {
        division: 'open',
      },
    }, {
      multi: true,
    });
  },
  down: function() {
    // There is no going back!
  },
});
