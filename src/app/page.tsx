'use client'
import { Metadata } from 'next'
import styles from './styles.module.css'
import Banner from './_components/banner/banner'
import Navbar from './_components/navbar/navbar'
import SectionCards from './_components/cards/section-cards'
import {
  getPopularVideos,
  getVideos,
  getWatchItAgainVideos,
  getYoutubeVideoById,
} from './_lib/videos'
import { useEffect, useState } from 'react'
import { verifyToken } from './_lib/utils'
import { getTokenCookie } from './_lib/cookies'
import { magic } from './_lib/magic-client'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const Page = (props: any) => {
  const [bannerVideo, setBannerVideo] = useState<any>({})
  const [disneyVideos, setDisneyVideos] = useState([])
  const [marvelVideos, setMarvelVideos] = useState([])
  const [travelVideos, setTravelVideos] = useState([])
  const [popularVideos, setPopularVideos] = useState([])
  const [watchItVideos, setWatchItVideos] = useState<any[]>([])

  useEffect(() => {
    const initVideos = async () => {
      setBannerVideo(
        [
          ...(await getYoutubeVideoById('PoJi4V6Q2AI', {
            cache: 'force-cache',
            revalidate: 60,
          })),
        ][0]
      )
      const token = getTokenCookie()
      setDisneyVideos(await getVideos('disney teaser', { cache: 'no-store' }))
      setMarvelVideos(await getVideos('marvel teaser', { cache: 'no-store' }))
      setTravelVideos(await getVideos('travel', { cache: 'no-store' }))
      setPopularVideos(await getPopularVideos({ cache: 'no-store' }))
      // const decoded=await verifyToken(token)
      const userMetadata = await magic?.user.getMetadata()
      if (userMetadata) {
        const userId = userMetadata.issuer
        setWatchItVideos(await getWatchItAgainVideos(token, userId!))
      }
    }
    initVideos()
  }, [])

  return (
    <div className={styles.container}>
      <Navbar />
      <Banner
        title={bannerVideo.title}
        subTitle=""
        imgUrl={bannerVideo.imgUrl}
        id={bannerVideo.id}
      />
      <section className={styles.sectionCardWrapper}>
        <SectionCards title="disney" videos={disneyVideos} />
        <SectionCards title="marvel" videos={marvelVideos} size="small" />
        <SectionCards
          title="watch it again"
          videos={watchItVideos}
          size="small"
        />
        <SectionCards title="travel" videos={travelVideos} size="large" />
        <SectionCards title="popular" videos={popularVideos} size="small" />
      </section>
    </div>
  )
}

export default Page
