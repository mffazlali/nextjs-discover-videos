'use client'
import Link from 'next/link'
import styles from './navbar.module.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Logo from '../logo/logo'
import { magic } from '@/app/_lib/magic'
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

  const handleLogout = async () => {
    await magic.user.logout();
    router.push('/login')
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Logo/>
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
                  <button onClick={handleLogout} className={styles.signOutLink}>
                    sign out
                  </button>
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
