const express = require('express');
const createError = require("http-errors")
const mongoose = require('mongoose');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}));

const PORT = 3000 || process.env.PORT

mongoose.set('strictQuery', false)

mongoose
  .connect(
    `mongodb+srv://arti.ck3bsyz.mongodb.net/?retryWrites=true&w=majority`,
    {
      dbName: 'artiDB',
      user: 'admin',
      pass: 'admin'
    }
  )
  .then(() => {
    console.log('Database is connected!')
  })

//router access for boards
const BoardsRoute = require("./Routes/Boards.route");
app.use('/boards', BoardsRoute);

app.get('/', (req, res) => {
  res.send('Hello World')
})


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
