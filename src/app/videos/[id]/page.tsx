'use client'
import { getVideos, getYoutubeVideoById } from '@/app/_lib/videos'
import { Metadata } from 'next'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import styles from './styles.module.css'
import cls from 'classnames'
import Navbar from '@/app/_components/navbar/navbar'
import { LikeIcon } from '@/app/_components/icons/like-icon'
import { DislikeIcon } from '@/app/_components/icons/dislike-icon'
import {
  getStatsService,
  setStatsService,
} from '@/app/_services/stats.services'

export const metadata: Metadata = {
  title: 'video',
  description: 'allow to discover favorite videos',
}

export const dynamicParams = false

export async function generateStaticParams() {
  const bannerVideos = await getYoutubeVideoById('1234', {
    cache: 'force-cache',
    revalidate: 60,
  })
  return bannerVideos.map((video: any) => ({
    id: video.id,
  }))
}

Modal.setAppElement('#__next')

const Page = ({ params }: { params: { id: string } }) => {
  const videoId = params.id
  const router = useRouter()
  const [modalIsOpen, setIsOpen] = useState(true)
  const [video, setVideo] = useState<any>({})
  const [toggleLike, setToggleLike] = useState<boolean>(false)
  const [toggleDisLike, setToggleDisLike] = useState<boolean>(false)

  // const video = {
  //   title: 'Hi Cute Dog',
  //   publishTime: '1990-01-01',
  //   description: 'a big red dog that is super cute, can he get any bigger?',
  //   channelTitle: 'paramount pictures',
  //   viewCount: '10000',
  // }

  useEffect(() => {
    const initBannerVideos = async () => {
      const videos = await getYoutubeVideoById(videoId, { cache: 'no-store' })
      if (videos && videos.length > 0) {
        setVideo(videos[0])
      }
    }

    initBannerVideos()
  }, [])

  useEffect(() => {
    const setLikeORDisLike = async () => {
      const response = await getStatsService(videoId)
      console.log({response})
      if (response.result) {
        const {favourited} = response.result
        console.log({favourited})
        if (favourited == 0) {
          setToggleDisLike(true)
        } else {
          setToggleLike(true)
        }
      }
    }
    setLikeORDisLike()
  }, [])
  // const { title, publishTime, description, channelTitle, viewCount } = video

  const handleToggleLike = async () => {
    if (!toggleLike) {
      setToggleLike(!toggleLike)
      setToggleDisLike(toggleLike)
      const favourited = toggleLike ? 0 : 1
      const result = await setStatsService({ videoId, favourited })
      console.log({ result })
    }
  }

  const handleToggleDisLike = async () => {
    if (!toggleDisLike) {
      setToggleDisLike(!toggleDisLike)
      setToggleLike(toggleDisLike)
      const favourited = toggleDisLike ? 1 : 0
      const result = await setStatsService({ videoId, favourited })
      console.log({ result })
    }
  }

  const afterOpenModal = () => {}

  const closeModal = () => {}

  return (
    <div className={styles.container}>
      <Navbar />
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
          src={`http://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://example.com&autoplay=0&controls=0&rel=1`}
          frameborder="0"
        ></iframe>
        <div className={styles.wrapperFavorite}>
          <div className={styles.wrapperFavoriteButton}>
            <button onClick={handleToggleLike}>
              {/* <FontAwesomeIcon icon={ThumbsUp} size="2xl" /> */}
              <LikeIcon selected={toggleLike} />
            </button>
          </div>
          <div className={styles.wrapperFavoriteButton}>
            <button onClick={handleToggleDisLike}>
              {/* <FontAwesomeIcon icon={ThumbsDown} size="2xl" /> */}
              <DislikeIcon selected={toggleDisLike} />
            </button>
          </div>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.modalBodyCol1}>
              <p className={styles.publishTime}>{video.publishTime}</p>
              <p className={styles.title}>{video.title}</p>
              <p className={styles.description}>{video.description}</p>
            </div>
            <div className={styles.modalBodyCol2}>
              <p className={cls(styles.subTextWrapper, styles.subText)}>
                <span className={styles.textColor}>cast: </span>
                <span className={styles.channelTitle}>
                  {video.channelTitle}
                </span>
              </p>
              <p className={cls(styles.subTextWrapper, styles.subText)}>
                <span className={styles.textColor}>view count: </span>
                <span className={styles.viewCount}>{video.viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Page
