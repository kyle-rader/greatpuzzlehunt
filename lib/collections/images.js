import { Meteor } from 'meteor/meteor';
import { isAdmin } from '../imports/method-helpers';

Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", { path: "~/file_uploads" })],
});

Images.allow({
  insert(userId, fileObj) {
    return isAdmin(userId);
  },
  update(userId, fileObj) {
    return isAdmin(userId);
  },
  download(userId, obj) {
    return true;
  },
  remove(userId, fileObj) {
    return isAdmin(userId);
  }
});


Meteor.methods({
});
