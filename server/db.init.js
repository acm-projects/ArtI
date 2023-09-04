import mongoose from 'mongoose'
export default (uri) => {
  let mongoURL = !uri
    ? `mongodb+srv://arti.ck3bsyz.mongodb.net/?retryWrites=true&w=majority`
    : uri
  mongoose.set('strictQuery', false)
  mongoose
    .connect(mongoURL, {
      dbName: 'artiDB',
      user: process.env.DB_USERNAME,
      pass: process.env.DB_PASSWORD,
    })
    .then(() => {
      console.log('Database is connected!')
    })
    .catch((err) => console.log(err.message))

  // Mongoose Events
  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db...')
  })

  mongoose.connection.on('error', (err) => {
    console.log(err.message)
  })

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected...')
  })

  // Detects Ctrl+C (server is stopped)
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(
        'Mongoose connection is disconnected due to app termination...'
      )
      process.exit(0)
    })
  })
}
