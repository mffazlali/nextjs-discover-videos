import Link from 'next/link'
import styles from './logo.module.css'

const Logo = () => {
  return (
    <div className={styles.container}>
      <Link legacyBehavior={true} href={'/'}>
        <a className={styles.logoLink}>
          <div className={styles.logoWrapper}>
            <span className={styles.logoFirstTitle}>NET</span>
            <span className={styles.logoSecondTitle}>FLIX</span>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default Logo
