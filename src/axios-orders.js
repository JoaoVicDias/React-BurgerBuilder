import axios from 'axios'

const instance = axios.create({
    baseURL:"https://react-my-burguer-757a6.firebaseio.com/"
})

export default instance