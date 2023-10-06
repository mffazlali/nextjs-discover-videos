'use client'
import Link from 'next/link'
import Card from './card/card'
import styles from './section-cards.module.css'
import cls from 'classnames'

const SectionCards = (props: any) => {
  const { title, videos, size, shouldWrap = false, shouldScale = true } = props
  return (
    <section className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <div className={cls(shouldWrap && styles.shouldWrap, styles.cardWrapper)}>
        {[...videos].map((video, idx) => {
          return (
            <Link href={`/videos/${video.id}`} key={idx}>
              <Card
                imgUrl={video.imgUrl}
                size={size}
                id={video.id}
                title={video.title}
                shouldScale={shouldScale}
              />
            </Link>
          )
        })}
      </div>
    </section>
  )
}
export default SectionCards
