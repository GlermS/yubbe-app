import Head from 'next/head'
import styles from '../../../styles/Home.module.css'
import {useState} from 'react'
import SignUpForm from '../../components/signup-form'



function SignUp(req, res) {
  const [auth, setAuth] = useState();
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Yubbe English Club</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {auth}
      <main className={styles.main}>
        <SignUpForm styleClass={styles.loginform} authenticationToken = {setAuth}/>
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

export default SignUp;