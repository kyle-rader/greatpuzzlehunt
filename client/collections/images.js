Images = new FS.Collection('images', {
  stores:[new FS.Store.Dropbox('images')],
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
  remove() {
    return true;
  },
  download() {
    return true;
  },
});
