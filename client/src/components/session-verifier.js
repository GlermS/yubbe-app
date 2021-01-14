import axios from 'axios'


export async function verifySession(cookies){
    //console.log(cookies.cookies.authToken)
    const resp = await axios({
      url:process.env.REACT_APP_BACKEND_URI+'/api/session',
      method: 'get',
      headers: {"Access-Control-Allow-Origin": "*", "authToken":cookies.authToken}
    }).then((response) => {
      return response
      }
    ).catch((error) =>{return {message: error.toString()}})

    return resp
}