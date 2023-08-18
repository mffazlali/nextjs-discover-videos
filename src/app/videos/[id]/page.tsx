'use client'
import { getVideos } from '@/app/_lib/videos'
import { Metadata } from 'next'
import { useRouter } from 'next/navigation'

export const metadata: Metadata = {
  title: 'video',
  description: 'allow to discover favorite videos',
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const disneyVideos = await getVideos('disney teaser')
  return disneyVideos.map((video: any, idx) => ({
    id: idx,
  }))
}

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  return (
    <>
      <h1>hi video: {params.id}</h1>
    </>
  )
}

export default Page
