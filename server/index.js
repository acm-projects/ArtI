import express from 'express'
import mongoose from 'mongoose'
import createHttpError from 'http-errors'
import dotenv from 'dotenv'
dotenv.config()
// Routes
import { UserRoute } from './Routes/User.route.js'
import { BoardsRoute } from './Routes/Boards.route.js'

const app = express()
app.use(express.json()) // allows express to parse req.body
app.use(express.urlencoded({ extended: true }))

const PORT = 3000 || process.env.PORT

mongoose.set('strictQuery', false)

mongoose
  .connect(
    `mongodb+srv://arti.ck3bsyz.mongodb.net/?retryWrites=true&w=majority`,
    {
      dbName: 'artiDB',
      user: process.env.dbUser,
      pass: process.env.dbPass,
    }
  )
  .then(() => {
    console.log('Database is connected!')
  })

app.get('/', (req, res) => {
  res.send('Hello World')
})

// USER ROUTES
app.use('/user', UserRoute)
app.use('/boards', BoardsRoute)

// 404 handler and pass to error handler
app.use((req, res, next) => {
  next(createHttpError(404, 'Not found'))
})

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  })
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

