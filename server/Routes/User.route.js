import express from 'express'
import createHttpError from 'http-errors'
const router = express.Router()

import { User } from '../Models/user.model.js'

// Gets all the users
router.get('/', async (req, res) => {
  try {
    const result = await User.find({}) // no filter means all
    res.send(result)
  } catch (error) {
    console.log(error)
  }
})

// Creating a new user -> would this be signup???
router.post('/', async (req, res, next) => {
  try {
    const user = new User(req.body) // the req.body is set by front-end after filling out form
    const result = await user.save()
    res.send(result)
  } catch (error) {
    console.log(error.message)
    if (error.name === 'ValidationError')
      next(createHttpError(422, error.message))
  }
})

// Getting a user based on their username - would this be login
router.get('/:username', async (req, res, next) => {
  try {
    const userName = req.params.username
    const result = await User.findOne({ username: userName })
    res.send(result)
  } catch (error) {
    console.log(error.message)
    if (error instanceof mongoose.CastError) {
      next(createError(400, 'Invalid username'))
      return
    }
    next(error)
  }
})

// Updating a user - any field
router.patch('/:username', async (req, res, next) => {
  try {
    const userName = req.params.username
    const updates = req.body // allows any field to be changed
    const options = { new: true }

    const result = await User.findOneAndUpdate(
      { username: userName },
      updates,
      options
    )
  } catch (error) {
    console.log(error.message)
    if (error instanceof mongoose.CastError) {
      next(createError(400, 'Invalid username'))
      return
    }
  }
})

// Deleting an existing user
router.delete('/:username', async (req, res, next) => {
  try {
    const userName = req.params.username
    const result = await User.findOneAndDelete({ username: userName })
    res.send(result)
  } catch (error) {
    console.log(error.message)
    if (error instanceof mongoose.CastError) {
      next(createError(400, 'Invalid username'))
      return
    }
  }
})

export { router as UserRoute }
