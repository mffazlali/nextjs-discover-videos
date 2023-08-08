import { Metadata } from 'next'
import styles from '../styles/home.module.css'
import Banner from '@/components/banner/banner'
import Navbar from '@/components/navbar/navbar'
import Card from '@/components/card/card'
import SectionCards from '@/components/card/section-cards'
import { getVideos } from '@/lib/videos'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const Home = () => {
  const videos = getVideos()
  console.log({videos})
  return (
    <div className={styles.container}>
      <Navbar username="mf.fazlali@gmail.com" />
      <Banner
        title="The Angry Birds Movie (2016)"
        subTitle="Sean Penn, Kate McKinnon, Anthony Padilla, Maya Rudolph, Jason Sudeikis"
        imgUrl="/static/banner-image.webp"
      />
      <section className={styles.sectionCardWrapper}>
        <SectionCards title="animation" videos={videos} />
      </section>
    </div>
  )
}

export default Home
