'use client'
import { Metadata } from 'next'
import styles from './styles.module.css'
import Logo from '../_components/logo/logo'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { magic } from '../_lib/magic-client'
import { loginService } from '../_services/login.services'

export const metadata: Metadata = {
  title: 'discover videos',
  description: 'allow to discover favorite videos',
}

const SignIn = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const isLoggedIn=async()=>{
    const isLoggedIn = await magic?.user.isLoggedIn();
    return isLoggedIn
  }
  const handleOnChangeEmail = (event: any) => {
    setEmail(event.target.value)
  }

  const handleSignInButton = async (event: any) => {
    event.preventDefault()
    if (email) {
      try {
        setIsLoading(true)
        await magic?.auth.loginWithEmailOTP({ email })
        const isLoggedInResult=await isLoggedIn()
        if (isLoggedInResult) {
          const didToken = await magic?.user.getIdToken()
          const result =await loginService(didToken)
          setIsLoading(false)
          router.push('/')
        } else {
          setIsLoading(false)
          setErrorMsg('something we wrong logging in')
        }
      } catch (err) {
        setIsLoading(false)
        setErrorMsg('something we wrong logging in')
      }
    } else {
      setErrorMsg('Enter a valid email address')
    }
  }

  return (
    <div className={styles.container}>
      <Logo />
      <div className={styles.signIn}>
        <div className={styles.signInWrapper}>
          <h1 className={styles.signInTitle}>sign in</h1>
          <div className={styles.emailWrapper}>
            <input
              type="email"
              placeholder="email address"
              className={styles.email}
              onChange={handleOnChangeEmail}
            />
            <span className={styles.errorMsg}>{errorMsg}</span>
          </div>
          <div className={styles.buttonWrapper}>
            <button onClick={handleSignInButton} className={styles.button}>
              {isLoading ? 'loading...' : 'sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
