import Cookies from 'js-cookie';
import axios from "axios";


const token = Cookies.get('token');
axios.defaults.baseURL = 'http://localhost:8790/api/v1/';
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

if (token === undefined) {
    console.log('Token not found');
}

export default axios;