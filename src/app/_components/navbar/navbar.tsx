'use client'
import Link from 'next/link'
import styles from './navbar.module.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
const Navbar = (props: any) => {
  const router = useRouter()
  const [showDropdown, setShowDropDown] = useState(false)
  const { username } = props

  const handleOnClickHome = (e: any) => {
    e.preventDefault()
    router.push('/')
  }

  const handleOnClickMyList = (e: any) => {
    e.preventDefault()
    router.push('/browse/my-list')
  }

  const handleShowDropdown = (e: any) => {
    e.preventDefault()
    setShowDropDown(!showDropdown)
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <a className={styles.logoLink}>
          <div className={styles.logoWrapper}>
            <span className={styles.logoFirstTitle}>NET</span>
            <span className={styles.logoSecondTitle}>FLIX</span>
          </div>
        </a>
        <ul className={styles.navItems}>
          <li className={styles.navItem1} onClick={handleOnClickHome}>
            home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            my list
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button
              className={styles.usernameButton}
              onClick={handleShowDropdown}
            >
              <span className={styles.username}>{username}</span>
              <span className="material-icons-round">expand_more</span>
            </button>
            {
              <div
                className={`${styles.navDrowdown} ${
                  showDropdown ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div>
                  <Link href="/login" className={styles.signOutLink}>
                    sign out
                  </Link>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            }
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
