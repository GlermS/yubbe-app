import axios from 'axios'
//import Head from 'next/head'
import '../styles/Home.module.css'
import {useEffect} from 'react'
import {useCookies} from 'react-cookie'
import {verifySession} from '../components/session-verifier'
//import {useRouter} from 'next/router'
import CallsList from '../components/callls-list'

export default function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

  const logoutFunc =async ()=>{
    await axios.get('/api/logout')
    //router.replace('/login')
  }

  useEffect (async()=>{
    await verifySession(cookies)
  })

  return (
    <div className="container">
      <head>
        <title>Yubbe English Club</title>
        <link rel="icon" href="/favicon.ico" />
      </head>

      <main className="main">
        <header className="header"><h1>Welcome, {}!</h1>  <button onClick={logoutFunc} className="logoutbutton">Logout</button></header>
        <CallsList />
       
      </main>

      <footer className="footer">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/yubbe-logo.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>
    </div>
  )
}
/*
Home.getInitialProps = async (ctx)=>{
  const resp  =await verifySession(ctx);
  return resp
}*/
