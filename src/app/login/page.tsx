import { Metadata } from 'next'
import styles from './styles.module.css'
import Logo from '../_components/logo/logo'

export const metadata: Metadata = {
  title: 'discover videos',
  description: 'allow to discover favorite videos',
}

const SignIn = () => {
  return (
    <div className={styles.container}>
      <Logo />
      <div className={styles.signIn}>
        <div className={styles.signInWrapper}></div>
      </div>
    </div>
  )
}

export default SignIn
