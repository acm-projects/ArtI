import axios from 'axios'

// Gets basic user information and passes back to parent component (App.js)
async function handleUser(basicUserInfo) {
  try {
    const body = {
      token: basicUserInfo.token,
      username: basicUserInfo.username,
    }
    const response = await axios.post('/api/v1/user/get', body)
    console.log(response)
    return response.data
  } catch (error) {
    console.log(error.message)
  }
}

function storeUser(userData) {
  if (!userData.token) return
  sessionStorage.setItem('arti', JSON.stringify(userData))
}

export { handleUser, storeUser }
