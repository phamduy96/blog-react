import axios from "../axios/axios"
import Cookies from "js-cookie";
let token = Cookies.get('token');
function checkJwt() {
    axios({
        method: "POST",
        url: "/user/checkJwt",
        data: {
            token: token
        }
    })
}

export default checkJwt