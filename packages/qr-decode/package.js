Package.describe({
  name: 'raderk:qr-decode',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'In Browser QR Code Decoding. Wrap of https://github.com/LazarSoft/jsqrcode',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/LazarSoft/jsqrcode',
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
