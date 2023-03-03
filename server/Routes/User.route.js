import express from 'express'
const router = express.Router()

const User = require('../Models/user.model')

router.get('/user', async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message)
  }
})
