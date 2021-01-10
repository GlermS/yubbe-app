import Head from 'next/head'
import styles from '../../../styles/Login.module.css'
import SignUpForm from '../../components/signup-form'



function SignUp(req, res) {
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Yubbe English Club</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <SignUpForm styleclass={styles.loginform}/>
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

export default SignUp;