Images = new FS.Collection('hint_images', {
  stores:[new FS.Store.Dropbox('hint_images')],
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
