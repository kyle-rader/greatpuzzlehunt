// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by qr-decode.js.
import { qrDecode as qr } from "meteor/qr-decode";

// Write your tests here!
// Here is an example.
Tinytest.add('qr-decode - example', function (test) {
  test.equal(packageName, "qr-decode");
});

