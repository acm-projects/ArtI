import createHttpError from 'http-errors'
import { User, validate } from '../Models/user.model.js'
import bcrypt from 'bcrypt'

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
    console.log(validate(req.body))
    const { error } = validate(req.body) // Check if request body is parsed correctly
    if (error)
      return res.status(400).send({ message: error.details[0].message })

    // Checks if user already exists
    const user = await User.findOne({ email: req.body.email })
    if (user)
      return res.status(409).send({
        message: 'There is a user that already exists with the same email!',
      })

    // Hashing password
    const salt = await bcrypt.genSalt(Number(10))
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    const result = await new User({
      ...req.body,
      password: hashPassword,
    }).save()

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

export { getAllUsers, createUser, getUser, updateUser, deleteUser }
