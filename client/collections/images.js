import { Meteor } from 'meteor/meteor';
import { isAdmin } from '../../lib/imports/method-helpers';


const store = new FS.Store.GridFS('images');

Images = new FS.Collection("images", {
  stores: [store],
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
