'use client'
import Card from './card/card'
import styles from './section-cards.module.css'

const SectionCards = (props: any) => {
  const { title, videos, size } = props
  return (
    <section className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.cardWrapper}>
        {[...videos].map((video, idx) => {
          return <Card imgUrl={video.imgUrl} size={size} id={video.id} title={video.title} key={idx} />
        })}
      </div>
    </section>
  )
}
export default SectionCards
