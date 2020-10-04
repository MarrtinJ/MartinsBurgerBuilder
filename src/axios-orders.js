import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-f067b.firebaseio.com/'
})

export default instance;