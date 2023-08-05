'use client'
import Link from 'next/link'
import styles from './navbar.module.css'
import {useRouter} from 'next/navigation'
const Navbar = (props: any) => {
  const router=useRouter()
  const { username } = props

  const handleOnClickHome=(e:any)=>{
    e.preventDefault()
    router.push('/')
  }

  const handleOnClickMyList=(e:any)=>{
    e.preventDefault()
    router.push('/browse/my-list')
  }


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <a className={styles.logoLink}>
          <div className={styles.logoWrapper}>NETFLIX</div>
        </a>
        <ul className={styles.navItems}>
          <li className={styles.navItem1} onClick={handleOnClickHome}>home</li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>my list</li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameButton}>
              <p className={styles.username}>{username}</p>
            </button>
            <div className={styles.navDrowdown}>
              <div>
                <Link href='/login' className={styles.signOutLink}>sign out</Link>
                <div className={styles.lineWrapper}></div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
