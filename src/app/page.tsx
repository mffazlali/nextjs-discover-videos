import { Metadata } from 'next'
import styles from './styles.module.css'
import Banner from './_components/banner/banner'
import Navbar from './_components/navbar/navbar'
import SectionCards from './_components/cards/section-cards'
import { getPopularVideos, getVideos } from './_lib/videos'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const Page = async(props:any) => {
  const bannerVideos = await getVideos('angry bird',{cache:'force-cache',revalidate:60},1)
  const disneyVideos = await getVideos('disney teaser',{cache:'no-cache',revalidate:60})
  const marvelVideos = await getVideos('marvel teaser',{cache:'no-cache',revalidate:60})
  const tracelVideos = await getVideos('travel',{cache:'no-cache',revalidate:60})
  const popularVideos = await getPopularVideos({cache:'no-cache',revalidate:60})
  return (
    <div className={styles.container}>
      <Navbar username="mf.fazlali@gmail.com" />
      <Banner
        title="The Angry Birds Movie (2016)"
        subTitle="Sean Penn, Kate McKinnon, Anthony Padilla, Maya Rudolph, Jason Sudeikis"
        imgUrl="/static/banner-image.webp"
        id="1234"
      />
      <section className={styles.sectionCardWrapper}>
        <SectionCards title="disney" videos={disneyVideos} />
        <SectionCards title="marvel" videos={marvelVideos} size="small"/>
        <SectionCards title="travel" videos={tracelVideos} size="large"/>
        <SectionCards title="popular" videos={popularVideos} size="small"/>
      </section>
    </div>
  )
}

export default Page
