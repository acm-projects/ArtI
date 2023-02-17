import { Express } from 'express'

const app = Express()

const PORT = 3000 | process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
