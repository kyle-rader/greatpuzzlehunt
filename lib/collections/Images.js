import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

// Image store for storing hint photos.
let imageStore = new FS.Store.GridFS('images');

Images = new FS.Collection('images', {
 stores: [imageStore]
});