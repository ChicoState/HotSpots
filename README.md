# HotSpots
[![Build Status](https://travis-ci.org/ChicoState/HotSpots.svg?branch=master)](https://travis-ci.org/ChicoState/HotSpots)

[![Coverage Status](https://coveralls.io/repos/github/ChicoState/HotSpots/badge.svg?branch=master)](https://coveralls.io/github/ChicoState/HotSpots?branch=master)

# Rudy's Fork
[![Build Status](https://travis-ci.org/rlamug/HotSpots.svg?branch=master)](https://travis-ci.org/rlamug/HotSpots)

[![Coverage Status](https://coveralls.io/repos/github/rlamug/HotSpots/badge.svg?branch=master)](https://coveralls.io/github/rlamug/HotSpots?branch=master)

A different branch for the profile feature was created because this feature only works on node version v10.16.3 while the rest of the features
work on node LTS. If the profile feature is run on a node LTS, expo and npm start encounters an Invalid regular expression error and is unable to run the app. An attempt to fix the error was made by changing the invalid regular expression, but then the app wouldn't load at all.

The profile tab has a log in and register feature. Once the user logs in, it allows the user to edit their account and add/remove friends.