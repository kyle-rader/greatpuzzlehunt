const dropboxStore = new FS.Store.Dropbox('hint_images', {
  key: Meteor.settings.dropbox.key,
  secret: Meteor.settings.dropbox.secret,
  token: Meteor.settings.dropbox.token,
});

Images = new FS.Collection('hint_images', {
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
