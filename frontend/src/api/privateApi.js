import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('token')
const instance = axios.create({
    baseURL:'http://localhost:5100',
    headers : {
        Authorization: `Bearer ${token}`

    }
})

export default instance;