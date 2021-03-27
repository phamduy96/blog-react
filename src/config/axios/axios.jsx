import axios from 'axios';
import Cookies from "js-cookie";
let token = Cookies.get('token');
axios.defaults.baseURL = process.env[`REACT_APP_BACKEND_${(process.env.NODE_ENV !== 'production' ? "DEV" : "PROD")}`]
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export default axios
