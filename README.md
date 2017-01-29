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

  ```
  {
    "public": {
      "siteName": "(Dev) Great Puzzle Hunt",
      "accountsEmail": "Great Puzzle Hunt <accounts@greatpuzzlehunt.com>",
      "infoEmail": "Great Puzzle Hunt <info@greatpuzzlehunt.com>",
      "eventYear": "2017",
      "social": {
        "facebook": "https://facebook.com/greatpuzzlehunt"
      },
      "analyticsSettings": {
        "Google Analytics" : {"trackingId": ""}
      }
    },
    "admin": {
      "firstname": "Kyle",
      "lastname": "Rader",
      "name": "Kyle Rader",
      "username": "mcyamaha",
      "email": "admin@gmail.com",
      "password": "testtest",
      "roles": ["user", "volunteer", "admin"],
      "address": "12345 NW Fake Dr.",
      "city": "Redmond",
      "state": "WA",
      "zip": "98053",
      "age": 25,
      "phone": "1231231234",
      "isAdult": true,
      "registrationType": "non-student",
      "photoPermission": true,
      "legalGuardian": {},
      "emergencyContact": {
        "name": "Mom",
        "relation": "mother",
        "phone": "1231231234",
        "altPhone": "1112223333",
        "email": "mom@gmail.com"
      }
    },
    "accounts": {
      "fromEmail": "Great Puzzle Hunt<accounts@greatpuzzlehunt.com>",
      "registrationApiKey": "ashbadkvhbzsdl"
    }
  }
  ```
9. Run the application using the scripts define in `package.json`

  ```
  $ npm start
  ```
