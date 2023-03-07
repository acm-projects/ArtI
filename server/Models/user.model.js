import Joi from 'joi'
import passwordComplexity from 'joi-password-complexity'
import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: false,
  },
  settings: {
    type: {},
    required: false,
  },
})

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY, {
    expiresin: '7d',
  })
  return token
}

const User = mongoose.model('users', UserSchema)

function validate(data) {
  const schema = Joi.object({
    username: Joi.string().required().label('Username'),
    email: Joi.string().required().label('Email'),
    password: passwordComplexity().required().label('Password'),
    firstName: Joi.string().required().label('First Name'),
    lastName: Joi.string().required().label('Last Name'),
  })
  return schema.validate(data)
}
export { User, validate }
