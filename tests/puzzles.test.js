import { Meteor } from 'meteor/meteor';
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
    console.log('test');
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

    // while(true) {}
  });
});
