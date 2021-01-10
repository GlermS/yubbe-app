import Head from 'next/head'
import styles from '../../../styles/Login.module.css'
import Router from 'next/router'
import axios from 'axios'
import LoginForm from '../../components/login-form.js'

async function verifySession(ctx){
  const cookies = ctx.req?.headers.cookie;

  const resp = await axios({
    url:'http://localhost:3000/api/session',
    method: 'get',
    headers:{
      cookie:cookies
    }
    }).then((response) => {
      return {data: response.data, status: response.status}

  }).catch(error =>{
    return {msg:error, status:401}
  })
  
   
  if (resp.status ===200 && !ctx.req){
    Router.replace('/')
    return
  }
  if(resp.status ===200 && ctx.req){
    ctx.res?.writeHead(302,{
      Location:'http://localhost:3000'
    });
    ctx.res?.end();
    return
  }

  return resp
}

function Login(req, res) {
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Yubbe English Club</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <LoginForm styleclass={styles.loginform}/>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/yubbe-logo.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
  
}

export default Login;

Login.getInitialProps= async (ctx)=>{
  
  const resp  =await verifySession(ctx);

  return resp
}