# The Great Puzzle Hunt
An on-line and in person real-time puzzle scavenger hunt!

## Development Setup

1. I recommend you install and start using the [ZSH Shell](https://github.com/robbyrussell/oh-my-zsh) (via the oh-my-zsh project as linked)

2. Install [NVM](https://github.com/creationix/nvm)

3. Install [MongoDB](https://docs.mongodb.com/manual/administration/install-community/)

4. Install [Meteor](https://www.meteor.com/install)

5. Use NVM to install the most recent version of Node and set an alias for that version as meteor.  If you want to use [yarn](https://code.facebook.com/posts/1840075619545360) as well install yarn.

  ```bash
  $ nvm install 11.12.0

  $ nvm alias meteor 11.12.0
  $ nvm use meteor
  $ npm i -g yarn
  ```
6. Clone the repo

  ```bash
  $ git clone git@github.com:cabeese/greatpuzzlehunt.git
  ```
7. CD into the repo and install NPM packages

  ```bash
  $ cd greatpuzzlehunt/
  $ yarn install  # instead of npm install
  ```
8. Add a new development settings file called `settings-development.json`

  ```
  {
    "public": {
      "siteName": "[DEV] Great Puzzle Hunt",
      "siteURL": "http://localhost:3000",
      "accountsEmail": "Great Puzzle Hunt <accounts@greatpuzzlehunt.com>",
      "infoEmail": "Great Puzzle Hunt <info@greatpuzzlehunt.com>",
      "eventYear": "2018",
      "eventDate": "Saturday April 14, 2018",
      "social": {
        "facebook": "https://facebook.com/greatpuzzlehunt"
      },
      "analyticsSettings": {
        "Google Analytics": {
          "trackingId": ""
        }
      }
    },
    "admin": {
      "firstname": "Super",
      "lastname": "Admin",
      "email": "super.admin@email.com",
      "password": "testtest",
      "roles": [
        "user",
        "volunteer",
        "player",
        "admin"
      ],
      "address": "1234 Cool Street",
      "city": "Redmond",
      "state": "WA",
      "zip": "98053",
      "age": 26,
      "phone": "1112223333",
      "accountType": "VOLUNTEER",
      "photoPermission": true,
      "holdHarmless": true,
      "ecName": "Emergency Contact",
      "ecRelationship": "friend",
      "ecPhone": "7778889999",
      "ecEmail": "ec.friend@email.com",
      "paid": true,
      "ticketUsed": null
    },
    "accounts": {
      "fromEmail": "Great Puzzle Hunt (Dev)<accounts@greatpuzzlehunt.com>",
      "token": "test_token"
    }
  }
  ```

9. Run the application using the scripts define in `package.json`

  ```
  $ yarn start
  ```

10. In another shell you can connect to the Meteor server with the Meteor shell (much like rails console).
  ```
  $ meteor shell
  ```

# Scripts

A few handy scripts exist in the `scripts/` directory.

* `sh scripts/hh_export.sh` will export all the users in the database. Used for "hold harmless" records.
* `sh scripts/update-heroku-config` will update the configuration settings in Heroku based on the `settings-prod.json` file.
* `sh restore_db.sh` will restore the local MongoDB database with the contents of a Mongo "dump" file `gph-mongo.dump`

# Troubleshooting

You might see an error message about not having the right version of bcrypt/missing bcrypt. Just manually install it:

```bash
$ meteor npm install bcrypt
```
