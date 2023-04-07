import express from 'express'
import { Configuration, OpenAIApi } from 'openai'
const router = express.Router()
// router.post('/', async(req, res, next) => {
//     console.log('hello')
// })

router.post('/', async (req, res, next) => {
  try {
    const { prompt } = req.body
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    })
    const openai = new OpenAIApi(configuration)

    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: '512x512',
      response_format: 'b64_json',
    })
    const { created, data } = response.data
    res.status(200).json({
      message: 'Success',
      response: {
        id: created,
        url: data[0]['b64_json'],
      },
    })
  } catch (error) {
    console.log('From Api Route :: ', error.message)
    res.send(error.message)
  }
})

export { router as ApiRouter }
