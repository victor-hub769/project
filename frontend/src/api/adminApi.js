import axios from 'axios';
import Cookies from 'js-cookie';

const admintoken = Cookies.get('admintoken')
const instance = axios.create({
    baseURL:'http://localhost:5100',
    headers : {
        Authorization: `Bearer ${admintoken}`

    }
})

export default instance;