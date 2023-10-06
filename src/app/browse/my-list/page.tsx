'use client'
import SectionCards from '@/app/_components/cards/section-cards'
import Navbar from '@/app/_components/navbar/navbar'
import { getTokenCookie } from '@/app/_lib/cookies'
import { magic } from '@/app/_lib/magic-client'
import { verifyToken } from '@/app/_lib/utils'
import { getFavouritedVideos } from '@/app/_lib/videos'
import { Metadata } from 'next'
import { useEffect, useState } from 'react'

export const metadata: Metadata = {
  title: 'my list',
}

const MyList = () => {
  const [favouritedVideos, setFavouritedVideos] = useState<any[]>([])

  useEffect(() => {
    const setFavourited = async () => {
      const token = getTokenCookie()
      // const decoded = await verifyToken(token)
      const userMetadata = await magic?.user.getMetadata()
      if (userMetadata) {
        const userId = userMetadata.issuer
        setFavouritedVideos(await getFavouritedVideos(token, userId!))
      }
    }

    setFavourited()
  }, [])

  return (
    <div className="">
      <Navbar />
      <div className="pt-24 pb-6">
        <SectionCards
          title="my list"
          videos={favouritedVideos}
          size="small"
          shouldWrap={true}
          shouldScale={false}
        />
      </div>
    </div>
  )
}

export default MyList
