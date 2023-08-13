'use client'
import { Metadata } from 'next'
import styles from './styles.module.css'
import Logo from '../_components/logo/logo'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export const metadata: Metadata = {
  title: 'discover videos',
  description: 'allow to discover favorite videos',
}

const SignIn = () => {
  const router=useRouter()
  const [email, setEmail] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const handleOnChangeEmail = (event: any) => {
    setEmail(event.target.value)
  }

  const handleSignInButton = () => {
    if (email) {
      if (email === 'mf.fazlali@gmail.com') {
        setIsLoading(true)
        router.push('/')
      } else {
        setIsLoading(true)
        setErrorMsg('invalid email address')
      }
    } else {
      setIsLoading(true)
      setErrorMsg('someting we went email address')
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
              {isLoading?'loading...':'sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
