#!/bin/bash

# Use MongoRestore to restore into database
mongorestore --host localhost --archive=gph-mongo.dump --verbose
