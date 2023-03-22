import express from 'express'
const router = express.Router()
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  getUserAuthorized,
  updateUser,
} from '../Controllers/UserController.js'

// Gets all the users
// router.get('/', getAllUsers)

// Creating a new user -> would this be signup???
router.post('/', createUser)

// Getting a user based on their username - would this be login
// router.get('/:username', getUser)
router.post('/get', getUserAuthorized) // post is required for client to pass token

// Updating a user - any field
// router.patch('/:username', updateUser)

// Deleting an existing user
// router.delete('/:username', deleteUser)

export { router as UserRoute }
