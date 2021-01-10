import axios from 'axios'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import {verifySession} from './api/session'
import {useRouter} from 'next/router'
import CallsList from '../components/callls-list'

export default function Home(ctx) {
  const router = useRouter()

  const logoutFunc =async ()=>{
    await axios.get('/api/logout')
    router.replace('/login')
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Yubbe English Club</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <header className={styles.header}><h1>Welcome, {ctx.data.name}!</h1>  <button onClick={logoutFunc} className={styles.logoutbutton}>Logout</button></header>
        <CallsList />
       
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

Home.getInitialProps = async (ctx)=>{
  const resp  =await verifySession(ctx);
  return resp
}