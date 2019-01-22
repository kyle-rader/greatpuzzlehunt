const { admin } = require('../settings-development');
const { testUser } = require('./config');

describe('User management', () => {
  // it('can register a new user', () => {
  //   browser.url('http://localhost:3000/register');

  //   // Fill out all fields except phone
  //   browser.setValue('input[name="firstname"]', testUser.firstName);
  //   browser.setValue('input[name="lastname"]', testUser.lastName);
  //   browser.setValue('input[name="email"]', testUser.email);
  //   browser.click('div[name="accountType"]');
  //   browser.click('div[name="accountType"] div.menu .item');
  //   browser.setValue('input[name="password"]', testUser.password);
  //   browser.setValue('input[name="confirmPassword"]', testUser.password);
  //   browser.setValue('input[name="age"]', testUser.age);
  //   browser.setValue('input[name="address"]', testUser.address);
  //   browser.setValue('input[name="city"]', testUser.city);
  //   browser.setValue('input[name="zip"]', testUser.zip);
  //   browser.click('div[name="state"]');
  //   browser.click('div[name="state"] div.menu .item');
  //   browser.setValue('input[name="ecName"]', testUser.emergencyContact);
  //   browser.setValue('input[name="ecRelationship"]', testUser.relationship);
  //   browser.setValue('input[name="ecPhone"]', testUser.phone);
  //   browser.setValue('input[name="ecEmail"]', testUser.email);

  //   const holdHarmlessCheckbox = browser.$('input[name="holdHarmless"]').$('..');
  //   holdHarmlessCheckbox.click();

  //   // Try to submit form
  //   browser.click('button[type="submit"]');

  //   // Form should have failed submission, make sure the error message popped up
  //   browser.$('div[title="There were issues registering!"]');

  //   // Fill in the phone number field
  //   browser.setValue('input[name="phone"]', testUser.phone);

  //   // Submit the form
  //   browser.click('button[type="submit"]');
  // });
  it('can verify and modify a user', () => {
    // Login as admin
    browser.url('http://localhost:3000/admin/users');
    browser.setValue('input[name="email"]', admin.email);
    browser.setValue('input[name="password"]', admin.password);
    browser.click('button[type="submit"]');
    browser.waitUntil(() => {
      return browser.getUrl() === 'http://localhost:3000/admin/users';
    });

    const userRow = browser.$('tr td span');
    console.log(userRow);
    while(true) {}

  });
})

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
    browser.$$('.column.five.row').forEach((e) => {
      try {
        if (e.getText().indexOf('Test Puzzle') !== -1) found = true;
      } catch (err) {
        // Pass
      }
    });
    console.log(found);

    while(true) {}
  });
});
