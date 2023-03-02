import express from 'express'
import mongoose from 'mongoose'

const app = express()

const PORT = 3000 || process.env.PORT

mongoose.set('strictQuery', false)

mongoose
  .connect(
    `mongodb+srv://admin:admin@arti.ck3bsyz.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Database is connected!')
  })

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
