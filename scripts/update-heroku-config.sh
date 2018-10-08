#!/bin/bash

# Update the Heroku configuration
heroku config:add METEOR_SETTINGS="$(cat settings-prod.json)"
