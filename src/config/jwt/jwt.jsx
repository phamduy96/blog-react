import axios from "../axios/axios"
function checkJwt(params) {
    axios({
        method: "POST",
        url: "/user/checkJwt"
    })
    .then((res)=>{
        console.log(res);
    })
}