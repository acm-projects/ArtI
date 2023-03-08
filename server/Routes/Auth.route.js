import { Router } from 'express'
import { User } from '../Models/user.model.js'
import bycrpt from 'bcrypt'
import Joi from 'joi'

const router = Router()

router.post('/', async (req, res) => {
  try {
    // Get username and password
    const { error } = validate(req.body)
    if (error)
      // error handler for incorrect fields
      return res.status(400).send({ message: error.details[0].message })

    // Finds an existing user
    const user = await User.findOne({ username: req.body.username })
    if (!user) return res.status(401).send({ message: 'Invalid Username' })

    // Checks if given password matches decrypted password from database using bycrypt package
    const password = await bycrpt.compare(req.body.password, user.password)
    if (!password) return res.status(401).send({ message: 'Invalid Password' })

    // User has been authenticated => will give a JWT token
    const token = user.generateAuthToken()
    res
      .status(200)
      .send({ data: token, message: 'User Logged In Successfully' })
  } catch (error) {
    console.log(error.message)
    res.status(500).send({ message: 'Internal server error' })
  }
})

// Check if the fields are verified and filled in correctly
function validate(data) {
  const schema = Joi.object({
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  })
  return schema.validate(data)
}

export { router as AuthRoute }
