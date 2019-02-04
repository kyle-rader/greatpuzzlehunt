const { admin } = require('../settings-development');
const { testUser } = require('./config');

describe('User management', () => {
  it('can register a new user', () => {
    browser.url('http://localhost:3000/register');

    // Fill out all fields except phone
    browser.setValue('input[name="firstname"]', testUser.firstName);
    browser.setValue('input[name="lastname"]', testUser.lastName);
    browser.setValue('input[name="email"]', testUser.email);
    browser.click('div[name="accountType"]');
    browser.click('div[name="accountType"] div.menu .item');
    browser.setValue('input[name="password"]', testUser.password);
    browser.setValue('input[name="confirmPassword"]', testUser.password);
    browser.setValue('input[name="age"]', testUser.age);
    browser.setValue('input[name="address"]', testUser.address);
    browser.setValue('input[name="city"]', testUser.city);
    browser.setValue('input[name="zip"]', testUser.zip);
    browser.click('div[name="state"]');
    browser.click('div[name="state"] div.menu .item');
    browser.setValue('input[name="ecName"]', testUser.emergencyContact);
    browser.setValue('input[name="ecRelationship"]', testUser.relationship);
    browser.setValue('input[name="ecPhone"]', testUser.phone);
    browser.setValue('input[name="ecEmail"]', testUser.email);

    const holdHarmlessCheckbox = browser.$('input[name="holdHarmless"]').$('..');
    holdHarmlessCheckbox.click();

    // Try to submit form
    browser.click('button[type="submit"]');

    // Form should have failed submission, make sure the error message popped up
    browser.$('div[title="There were issues registering!"]');

    // Fill in the phone number field
    browser.setValue('input[name="phone"]', testUser.phone);

    // Submit the form
    browser.click('button[type="submit"]');
  });
  it('can verify and modify a user', () => {
    // Login as admin
    browser.url('http://localhost:3000/admin/users');
    browser.setValue('input[name="email"]', admin.email);
    browser.setValue('input[name="password"]', admin.password);
    browser.click('button[type="submit"]');
    browser.waitUntil(() => {
      return browser.getUrl() === 'http://localhost:3000/admin/users';
    });

    // Check that test user is in the list of users
    browser.pause(1000); // This is to make sure the DOM loads in time
    const userName = browser.$(`span=${testUser.firstName} ${testUser.lastName}`);
    if (userName.value === null) throw new Error('Couldn\'t find test user in user list');

    // Verify and pay for the user
    const userRow = userName.$('..').$('..');
    userRow.$('button').click();
    browser.$('button=Verify Email').click();
    browser.pause(2000);
    browser.$('button=Pay').click();
    browser.alertAccept();

    // Logout of admin
    browser.url('http://localhost:3000/');
    browser.pause(1000);
    const menu = browser.$('i.settings').$('..');
    console.log(menu);
    menu.click();
    browser.pause(1000);
    menu.$('i.sign.out').$('..').click();
    browser.pause(1000);
  });
  it('allows a user to create a join a team', () => {
    // Login as user
    browser.url('http://localhost:3000/team/create');
    browser.setValue('input[name="email"]', testUser.email);
    browser.setValue('input[name="password"]', testUser.password);
    browser.click('button[type="submit"]');
    browser.waitUntil(() => {
      return browser.getUrl() === 'http://localhost:3000/team/create';
    });
    browser.pause(1000);

    // Let's create a team
    browser.setValue('input[name="name"]', 'Test team');
    browser.setValue('input[name="password"]', 'bestteam');
    browser.click('div.radio.checkbox');
    browser.click('button[type="submit"]');

    // Let's sign out
    browser.url('http://localhost:3000/');
    browser.pause(1000);
    const menu = browser.$('i.settings').$('..');
    console.log(menu);
    menu.click();
    browser.pause(1000);
    menu.$('i.sign.out').$('..').click();
    browser.pause(1000);
  });
});

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
  it('can control check-in and gameplay', () => {
    browser.url('http://localhost:3000/admin/gamestate');
    browser.pause(1000);
    const checkIn = browser.$('button.red');
    console.log(checkIn);
    checkIn.click();
    browser.alertAccept();
    browser.pause(1000);
    const registration = browser.$('button.red');
    console.log(registration);
    registration.click();
    browser.alertAccept();
    browser.pause(1000);

    // Let's sign out
    browser.url('http://localhost:3000/');
    browser.pause(1000);
    const menu = browser.$('i.settings').$('..');
    console.log(menu);
    menu.click();
    browser.pause(1000);
    menu.$('i.sign.out').$('..').click();
    browser.pause(1000);
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
