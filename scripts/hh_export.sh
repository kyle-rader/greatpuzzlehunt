#!/bin/bash

# Export all users to a CSV file
mongoexport --db greatpuzzlehunt --collection users --type csv -o hold_harmless.csv --fields "firstname,lastname,accountType,photoPermission,age,address,city,state,zip,holdHarmless"
