# The Great Puzzle Hunt
An on-line and in person real-time puzzle scavenger hunt!

## Development Setup

1. I recommend you install and start using the [ZSH Shell](https://github.com/robbyrussell/oh-my-zsh) (via the oh-my-zsh project as linked)

2. Install [NVM](https://github.com/creationix/nvm)

3. Install [MongoDB](https://docs.mongodb.com/manual/administration/install-community/)

4. Install [Meteor](https://www.meteor.com/install)

5. Use NVM to install `Node@4.4.7` and set an alias for that version as meteor.  If you want to use [yarn](https://code.facebook.com/posts/1840075619545360) as well install yarn.

  ```bash
  $ nvm install 4.4.7

  $ nvm alias meteor 4.4.7
  $ nvm use meteor
  $ npm i -g yarn
  ```
6. Clone the repo

  ```bash
  $ git clone git@github.com:kyle-rader/puzzlehunt.git
  ```
7. CD into the repo and install NPM packages

  ```bash
  $ cd puzzlehunt/
  $ yarn install  # instead of npm install
  ```
8. Add a new development settings file called `settings-development.json`
  Note the `dropbox` section. If this section is provided files will be stored
  in your dropbox folder at the `storagePath` (Dropbox config).  
  If not, we will use local file storage.

  ```
  {
    "public": {
      "siteName": "Great Puzzle Hunt",
      "accountsEmail": "Great Puzzle Hunt <accounts@greatpuzzlehunt.com>",
      "infoEmail": "Great Puzzle Hunt <info@greatpuzzlehunt.com>",
      "eventYear": "2017",
      "social": {
        "facebook": "https://facebook.com/greatpuzzlehunt"
      },
      "analyticsSettings": {
        "Google Analytics" : {"trackingId": "UA-78225937-1"}
      }
    },
    "admin": {
      "firstname": "Kyle",
      "lastname": "Rader",
      "name": "Kyle Rader",
      "username": "mcyamaha",
      "email": "kyle@kylerader.ninja",
      "password": "_!CMnmkit5641",
      "roles": ["user", "volunteer", "admin"],
      "address": "23714 NE 61st Street",
      "city": "Redmond",
      "state": "WA",
      "zip": "98053",
      "age": 25,
      "phone": "4252417977",
      "isAdult": true,
      "registrationType": "non-student",
      "photoPermission": true,
      "legalGuardian": {},
      "emergencyContact": {
        "name": "Janet King",
        "relation": "mother",
        "phone": "4252410142",
        "altPhone": "4252410106",
        "email": "janet.king@comcast.net"
      }
    },
    "accounts": {
      "fromEmail": "Great Puzzle Hunt<accounts@greatpuzzlehunt.com>",
      "registrationApiKey": "KM3zNRL61h0Pi98A58ASD9q5"
    },
    "dropbox": {
      "key": "your_key",
      "secret": "super_secret",
      "token": "access_token"
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
