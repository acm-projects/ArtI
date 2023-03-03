const mongoose = require('mongoose');
const Schema = mongoose.Schema

const boardsSchema = new Schema({
  username: {
    type: String,
    required: true,
  },

  boardName: {
    type: String,
    required: true,
  },

  images: {
    type: [],
    requierd: true,
  },

  thumbnail: {
    type: String,
    required: false,
  },
})

const boards = mongoose.model('boards', boardsSchema)
module.exports = boards;