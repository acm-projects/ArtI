import { useState } from 'react'
import GenerateBtn from './GenerateBtn'

const PromptBar = () => {

    const [formData, setFormData] = useState({
        prompttext: ""
      })

      console.log(formData)

      function handleChange(event) {
        setFormData(prevFormData => {
    
          return {
            ...prevFormData,
            [event.target.name]: event.target.value
    
          }
        })
        
      }

      function handleSubmit(event) {
        event.preventDefault()
        console.log(formData)
        console.log("submitted")
    
      }

  return (
    <form 
    className = 'prompt-form' 
    onSubmit={handleSubmit}
    >

      <div className = 'form-control'>
        <input 
        type = 'text' 
        placeholder = 'Enter your prompt...'
        onChange = {handleChange}
        name = "prompttext"
        value = {formData.prompttext}
         />

      </div>

      <GenerateBtn text = 'Generate' />
    </form>

  )
    
    
}

export default PromptBar