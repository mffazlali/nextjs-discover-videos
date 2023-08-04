'use client'
import styles from './banner.module.css'
const Banner = (props: any) => {
  const handlePlayButton = () => {
    console.log('play button')
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <div className={styles.nseriesWrapper}>
            <p className={styles.firstLetter}>N</p>
            <p className={styles.series}>S E R I E S</p>
          </div>
          <h3 className={styles.title}>{props.title}</h3>
          <h3 className={styles.subTitle}>{props.subTitle}</h3>
          <div className={styles.warpperButton}>
            <button className={styles.playButton} onClick={handlePlayButton}>
              <span className="material-icons-round">play_arrow</span>
              <span className={styles.playText}>play</span>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.imageWrapper}>
        <div className={styles.image}></div>
      </div>
    </div>
  )
}

export default Banner
