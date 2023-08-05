import styles from './card.module.css'
import Image from 'next/image'

const Card = (props: any) => {
  const { imgUrl, size } = props
  const classMap = {
    small: styles.smItem,
    medium: styles.mdItem,
    large: styles.lgItem,
  }
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <div className={Object(classMap)[size]}>
          <Image src={imgUrl} fill={true} alt=""></Image>
        </div>
      </div>
    </div>
  )
}

export default Card
