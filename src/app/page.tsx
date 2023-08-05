import { Metadata } from 'next'
import styles from '../styles/home.module.css'
import Banner from '@/components/banner/banner'
import Navbar from '@/components/navbar/navbar'
import Card from '@/components/card/card'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

 const Home=()=> {
  return (
    <div className={styles.container}>
      <Navbar username='mf.fazlali@gmail.com'/>
      <Banner title="The Angry Birds Movie (2016)" subTitle="Sean Penn, Kate McKinnon, Anthony Padilla, Maya Rudolph, Jason Sudeikis" imgUrl="/static/banner-image.webp"/>
      <Card imgUrl='/static/background.png' size='small'/>
      <Card imgUrl='/static/background.png' size='medium'/>
      <Card imgUrl='/static/background.png' size='large'/>
    </div>
  )
}

export default Home
