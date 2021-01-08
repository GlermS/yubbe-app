import axios from 'axios'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import {verifySession} from './api/session'
import {useRouter} from 'next/router'

export default function Home(req, res) {
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

      <main styleClass={styles.main}>
        Your site
        <button onClick={logoutFunc}>Logout</button>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

Home.getInitialProps = async (ctx)=>{
  
  const resp  =await verifySession(ctx);

  return resp
}