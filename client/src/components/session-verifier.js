import axios from 'axios'


export async function verifySession(cookies){
    console.log(cookies)
    const resp = await axios({
      url:'http://localhost:5000/api/session',
      method: 'get',
      proxy:{
          host: 'localhost',
          port:5000
      },
      headers:{
        "Access-Control-Allow-Origin": "*",
        cookies:cookies
      }
      }).then((response) => {
        return {data: response.data, status: response.status}
  
    }).catch(error =>{
      return {msg:error, status:401}
    })
    return resp
}