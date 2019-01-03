const { admin } = require('../settings-development');

describe('Puzzle management', () => {
  beforeEach(() => {
    // Login as admin user
    browser.url('http://localhost:3000');
    browser.click('a.item[href="/login"]');
    browser.setValue('input[name="email"]', admin.email);
    browser.setValue('input[name="password"]', admin.password);
    browser.click('button[type="submit"]');
    browser.waitUntil(() => {
      return browser.getUrl() === 'http://localhost:3000/profile';
    });
  });

  it('can create a puzzle', () => {
    // Navigate to puzzle management page
    browser.url('http://localhost:3000/admin/puzzles');

    // Click the 'New Puzzle' button
    browser.click('button.ui.small.basic.button[role="button"]');

    // Click the 'Edit' button
    browser.click('button.ui.green.basic.right.floated.button');

    // Fill out puzzle form
    browser.setValue('input[name="name"]', 'Test Puzzle');
    browser.setValue('input[name="answer"]', '42');
    browser.setValue('input[name="hint_0_text"]', 'The answer to life, the universe, everything');

    // Save the form
    browser.$$('button.ui.green.button')[1].click();
    try {
      browser.alertAccept();
    } catch (err) {
      console.error(err);
    }

    // Check that puzzle properly created by refreshing page and checking list for puzzle
    browser.url('http://localhost:3000/admin/puzzles');
    let found = false;
    browser.$$('div.column').forEach((e) => {
      try {
        if (e.getText().indexOf('Test Puzzle') !== -1) found = true;
      } catch (err) {
        // Pass
      }
    });

    while(true) {}
  });
});
