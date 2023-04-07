import express from 'express'
import { Configuration, OpenAIApi } from 'openai'
const router = express.Router()

router.post('/', async(req, res, next) => {
    try {
        console.log('text completion called')
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY    
        })
        const openai = new OpenAIApi(configuration);

        const textApiInput = "Generate a random prompt for an artist to draw"

        const textResponse = await openai.createCompletion(
            {
                model: "text-davinci-003",
                prompt: ""+ textApiInput +"",
                max_tokens: 50,
                temperature: 0.9
            } 
        ) 
        console.log(textResponse.data.choices[0].text)
        const randomPrompt = textResponse.data.choices[0].text

        res.json({
            message: "Success!",
            prompt: randomPrompt
        })
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

export {router as TextCompleteRouter}