const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect("mongodb+srv://admin-emre:test123@cluster0.s8yr4.mongodb.net/pcatDB")

//create schema
const PhotoSchema = new Schema({
  title: String,
  description: String,
  image: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;
