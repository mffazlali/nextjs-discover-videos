import { Metadata } from 'next'
import styles from './styles.module.css'
import Banner from './_components/banner/banner'
import Navbar from './_components/navbar/navbar'
import SectionCards from './_components/cards/section-cards'
import { getPopularVideos, getVideos, getYoutubeVideoById } from './_lib/videos'
import { startFetchMyQuery } from './_lib/hasura'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const Page = async (props: any) => {
  const bannerVideo = await getYoutubeVideoById('1234', {
    cache: 'force-cache',
    revalidate: 60,
  })
  const disneyVideos = await getVideos('disney teaser', { cache: 'no-store' })
  const marvelVideos = await getVideos('marvel teaser', { cache: 'no-store' })
  const tracelVideos = await getVideos('travel', { cache: 'no-store' })
  const popularVideos = await getPopularVideos({ cache: 'no-store' })
  startFetchMyQuery()
  return (
    <div className={styles.container}>
      <Navbar />
      <Banner
        title="The Angry Birds Movie (2016)"
        subTitle="Sean Penn, Kate McKinnon, Anthony Padilla, Maya Rudolph, Jason Sudeikis"
        imgUrl="/static/banner-image.webp"
        id="1234"
      />
      <section className={styles.sectionCardWrapper}>
        <SectionCards title="disney" videos={disneyVideos} />
        <SectionCards title="marvel" videos={marvelVideos} size="small" />
        <SectionCards title="travel" videos={tracelVideos} size="large" />
        <SectionCards title="popular" videos={popularVideos} size="small" />
      </section>
    </div>
  )
}

export default Page
