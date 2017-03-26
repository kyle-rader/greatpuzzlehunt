import { requireAdmin } from '../../lib/imports/method-helpers';

const dropboxStore = new FS.Store.Dropbox('images', {
  key: Meteor.settings.dropbox.key,
  secret: Meteor.settings.dropbox.secret,
  token: Meteor.settings.dropbox.token,
});

Images = new FS.Collection('images', {
  stores: [dropboxStore],
  filter: {
    allow: {
      contentTypes: ['image/*'],
    },
  },
});

Images.allow({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  download() {
    return true;
  },
});

Meteor.methods({
  'admin.image.delete'(imageId) {
    check(imageId, String);
    requireAdmin();

    console.log(`Admin is removing image ${imageId}`);

    // TODO:
    // Step 1. Find any Puzzles where this image is being used.
    // Step 2. Disable removing Image if hints are using it.
    // Step 3. Remove the Image.
    return true;
  }
})
