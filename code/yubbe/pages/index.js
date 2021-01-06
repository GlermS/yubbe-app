import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react'
import LoginForm from '../src/components/login-form.js'



class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      authentication: '',
    }
  }

  render(){
  return (
    <div className={styles.container}>
      <Head>
        <title>Yubbe English Club</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <LoginForm styleClass={styles.loginform}/>
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
}



export default Home;