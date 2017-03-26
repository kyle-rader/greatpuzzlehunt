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
    const puzzlesUsing = Puzzles.find({ hints: { $elemMatch: { 'image.id': imageId } } }).count();
    if (puzzlesUsing > 0) throw new Meteor.Error(400, 'There are puzzle(s) using this image still! Rmove them first');

    // Step 3. Remove the Image.
    return Images.remove(imageId);
  }
})
