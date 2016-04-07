Package.describe({
  name: 'raderk:qr-decode',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'A client side package for QR decoding with getMediaStream from html5 supported browsers or image upload.',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3');
  api.use('ecmascript');
  api.mainModule('qr-decode.js');

  api.export('qrcode');

});

// Package.onTest(function(api) {
//   api.use('ecmascript');
//   api.use('tinytest');
//   api.use('raderk:qr-decode');
//   api.mainModule('qr-decode-tests.js');
// });
