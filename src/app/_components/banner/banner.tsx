'use client'
import { useRouter } from 'next/navigation'
import styles from './banner.module.css'
import cls from "classnames";
import Image from 'next/image'

const Banner = (props: any) => {
  const router=useRouter()
  const handlePlayButton = () => {
    router.push(`videos/${props.id}`)
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
        <Image
          src={props.imgUrl}
          fill={true}
          objectFit="cover"
          alt={props.title}
          unoptimized={true}
          key={props.id}
          className={styles.image}
        ></Image>

      </div>
    </div>
  )
}

export default Banner
