import { Meteor } from 'meteor/meteor';
import { isAdmin } from '../imports/method-helpers';

const store = new FS.Store.FileSystem("images", { path: "~/file_uploads" });
Images = new FS.Collection("images", {
  stores: [store],
});

function onImageUploaded(storeName, fileObj) {
  // Check for referenced Sposprs.
  const url = fileObj.url();

  Meteor.logger.info(`Updating Sponsors with imageId: ${fileObj._id} with url: ${url}`);
  Sponsors.update({ imageId: fileObj._id }, { $set: {
    logoUrl: url,
  }});

  // Other Updates.
}

// When store has uploaded something check for references that need updating.
store.on('stored', Meteor.bindEnvironment(onImageUploaded, function(error) {
  Meteor.logger.error("Error in bindEnvironment", error);
}));

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
