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

        const textApiInput = "Create a random prompt for an artist to draw, specify an art style that it should be in."

        const textResponse = await openai.createCompletion(
            {
                model: "text-davinci-003",
                prompt: ""+ textApiInput +"",
                max_tokens: 50,
                temperature: .99
            } 
        ) 
        console.log(textResponse.data.choices[0].text)
        let randomPrompt = textResponse.data.choices[0].text
        console.log(randomPrompt.indexOf("Draw"))
        if(randomPrompt.indexOf("Draw") > -1){
            randomPrompt = randomPrompt.replace("Draw", "Create");
        }
        console.log(randomPrompt)
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