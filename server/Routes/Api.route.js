import express from 'express'
import { Configuration, OpenAIApi } from 'openai'
const router = express.Router()
// router.post('/', async(req, res, next) => {
//     console.log('hello')
// })

router.post('/', async(req, res, next) => {
    try {
        console.log('backend called')
        const {prompt} = req.body
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY    
        })
        const openai = new OpenAIApi(configuration);
        let imageUrl = ''

        const response =  await openai.createImage(
            {
                prompt: prompt,
                n: 1,
                size: "1024x1024",
            },
        )
        imageUrl = response.data.data[0].url
        console.log(`this is the image url: ${imageUrl}`)

        res.json({
            message: 'Success',
            response: imageUrl,
        })

    } catch (error) {
        console.log('From Api Route :: ', error.message)
        res.send(error.message)
        
    }
})

export {router as ApiRouter}