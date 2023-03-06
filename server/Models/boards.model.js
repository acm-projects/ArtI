import mongoose, { Schema } from 'mongoose'

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

  customThumbnail: {
    type: Boolean,
    required: false,
  },
  
})

const Board = mongoose.model('boards', boardsSchema)
export { Board }