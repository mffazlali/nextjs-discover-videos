import styles from './navbar.module.css'
const Navbar = (props: any) => {
  const { username } = props
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <a className={styles.logoLink}>
          <div className={styles.logoWrapper}>NETFLIX</div>
        </a>
        <ul className={styles.navItems}>
          <li className={styles.navItem1}>home</li>
          <li className={styles.navItem2}>my list</li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameButton}>
              <p className={styles.username}>{username}</p>
            </button>
            <div className={styles.navDrowdown}>
              <div>
                <a className={styles.signOutLink}>sign out</a>
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
