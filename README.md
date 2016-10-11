# WWU Puzzle hunt
An on-line and in person real-time puzzle scavenger hunt!

## Development Setup

1. I recommend you install and start using the [ZSH Shell](https://github.com/robbyrussell/oh-my-zsh) (via the oh-my-zsh project as linked)

2. Install [NVM](https://github.com/creationix/nvm)

3. Install [MongoDB](https://docs.mongodb.com/manual/administration/install-community/)

4. Install [Meteor](https://www.meteor.com/install)

5. Use NVM to install `Node@4.4.7` and set an alias for that version as meteor

  ```bash
  $ nvm install 4.4.7

  $ nvm alias meteor 4.4.7
  $ nvm use meteor
  ```
6. Clone the repo

  ```bash
  $ git clone git@github.com:kyle-rader/puzzlehunt.git
  ```
7. CD into the repo and install NPM packages

  ```bash
  $ cd puzzlehunt/
  $ npm install
  ```
8. Add a new development settings file called `settings-development.json`

  ```
  {
    "public": {
      "siteName": "(Dev) Great Puzzle Hunt",
      "social": {
        "facebook": "https://facebook.com/greatpuzzlehunt"
      },
      "analyticsSettings": {
        "Google Analytics" : {"trackingId": ""}
      }
    },
    "admin": {
      "firstname": "<YOUR FIRST NAME>",
      "lastname": "<YOUR LAST NAME>",
      "username": "<USERNAME>",
      "email": "<YOUR EMAIL>",
      "password": "<PASSWORD>"
    },
    "accounts": {
      "fromEmail": "Great Puzzle Hunt<accounts@greatpuzzlehunt.com>"
    }
  }
  ```
9. Run the application using the scripts define in `package.json`

  ```
  $ npm start
  ```
