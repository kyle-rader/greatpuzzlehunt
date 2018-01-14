import { Meteor } from 'meteor/meteor';
import { isAdmin } from '../imports/method-helpers';

Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", { path: "~/file_uploads" })],
});

Images.allow({
  insert(userId, fileObj) {
    Meteor.logger.info(`User: ${userId} would like to insert:`);
    return isAdmin(userId);
  },
  update() {
    return true;
  },
  download(userId, obj) {
    return true;
  },
  remove() {
    requireAdmin();
    return true;
  }
});


Meteor.methods({

});
