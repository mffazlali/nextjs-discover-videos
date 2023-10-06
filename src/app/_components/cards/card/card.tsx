'use client'
import { useState } from 'react'
import styles from './card.module.css'
import Image from 'next/image'
import { motion } from 'framer-motion'
import cls from 'classnames'

const Card = (props: any) => {
  const {
    imgUrl = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1159&q=80',
    size = 'medium',
    id,
    title,
    shouldScale,
  } = props
  const classMap = {
    small: styles.smItem,
    medium: styles.mdItem,
    large: styles.lgItem,
  }

  const [imgSrc, setImgSrc] = useState(imgUrl)
  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 }
  if(shouldScale==false)
  console.log({shouldScale})
  const shouldHover = shouldScale && { whileHover: { ...scale } }
  const onErrorHandler = () => {
    setImgSrc(
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1159&q=80'
    )
  }

  return (
    <div className={styles.container}>
      <motion.div
        className={cls(styles.imageWrapper, Object(classMap)[size])}
        {...shouldHover}
      >
        <Image
          onError={onErrorHandler}
          src={imgSrc}
          fill={true}
          objectFit="cover"
          alt={title}
          unoptimized={true}
          key={id}
        ></Image>
      </motion.div>
    </div>
  )
}

export default Card
