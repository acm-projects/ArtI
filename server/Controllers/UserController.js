import createHttpError from 'http-errors'
import { User } from '../Models/user.model.js'

async function getAllUsers(req, res) {
  try {
    const result = await User.find({}) // no filter means all
    res.send(result)
  } catch (error) {
    console.log(error)
  }
}

async function createUser(req, res, next) {
  try {
    const user = new User(req.body) // the req.body is set by front-end after filling out form
    const result = await user.save()
    res.send(result)
  } catch (error) {
    console.log(error.message)
    if (error.name === 'ValidationError')
      next(createHttpError(422, error.message))
  }
}

async function getUser(req, res, next) {
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
}

async function updateUser(req, res, next) {
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
}

async function deleteUser(req, res, next) {
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
}

export { getAllUsers, createUser, getUser, updateUser, deleteUser }
