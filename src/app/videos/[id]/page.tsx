'use client'
import { getVideos } from '@/app/_lib/videos'
import { Metadata } from 'next'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Modal from 'react-modal'
import styles from './styles.module.css'
import cls from 'classnames'

export const metadata: Metadata = {
  title: 'video',
  description: 'allow to discover favorite videos',
}

export const dynamicParams = false

export async function generateStaticParams() {
  const disneyVideos = await getVideos('disney teaser')
  return disneyVideos.map((video: any, idx) => ({
    id: idx,
  }))
}

Modal.setAppElement('#__next')

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const [modalIsOpen, setIsOpen] = useState(true)

  const video = {
    title: 'Hi Cute Dog',
    publishTime: '1990-01-01',
    description: 'a big red dog that is super cute, can he get any bigger?',
    channelTitle: 'paramount pictures',
    viewCount: '10000',
  }

  const {title,publishTime,description,channelTitle,viewCount}=video

  const afterOpenModal = () => {}

  const closeModal = () => {}

  return (
    <div className={styles.container}>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
        contentLabel="watch the video"
      >
        <iframe
          id="player"
          type="text/html"
          width="100%"
          height="390"
          className={styles.videoPlayer}
          src={`http://www.youtube.com/embed/${params.id}?enablejsapi=1&origin=http://example.com&autoplay=0&controls=0&rel=1`}
          frameborder="0"
        ></iframe>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.modalBodyCol1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.modalBodyCol2}>
              <p className={cls(styles.subTextWrapper,styles.subText)}>
                <span className={styles.textColor}>cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={cls(styles.subTextWrapper,styles.subText)}>
                <span className={styles.textColor}>view count: </span>
                <span className={styles.viewCount}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Page
