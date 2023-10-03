import { NextRequest, NextResponse } from 'next/server'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { getStatsByVideoId, insertStats, updateStats } from '@/app/_lib/hasura'

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies!.get('token')!.value
    const decodedToken = jwt.verify(
      token,
      process.env.NEXT_PUBLIC_HUSARA_JWT!
    )
    if (decodedToken) {
      const jwtToken = `Bearer ${token}`
      const userId = await (decodedToken as JwtPayload).issuer
      const videoId = await req.nextUrl.searchParams.get('videoId')!
      const findedStats = await getStatsByVideoId(jwtToken, userId, videoId)
      const doesStatsExist = [...findedStats.data.stats].length > 0
      if (doesStatsExist) {
        return NextResponse.json(
          { result: findedStats.data.stats[0] },
          {
            status: 200,
          }
        )
      } else {
        return NextResponse.json(
          { result: null },
          {
            status: 403,
          }
        )
      }
    } else {
      return NextResponse.json(
        { result: null },
        {
          status: 403,
        }
      )
    }
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log({ req })
    const token = req.cookies!.get('token')!.value
    console.log({ token })
    const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_HUSARA_JWT!)
    console.log({ decodedToken })
    if (decodedToken) {
      const jwtToken = `Bearer ${token}`
      const userId = await (decodedToken as JwtPayload).issuer
      const res = await req.json()
      console.log({req:res})
      let { videoId, favourited, watched = false } = res.stats
      const findedStats = await getStatsByVideoId(jwtToken, userId, videoId)
      const stats = {
        userId,
        videoId,
        favourited,
        watched,
      }
      console.log({findedStats})
      const doesStatsExist = [...findedStats.data.stats].length > 0
      let result = null
      if (doesStatsExist) {
        const updateedStats = await updateStats(jwtToken, stats)
        result = updateedStats
        console.log({ updateedStats })
      } else {
        const insertedStats = await insertStats(jwtToken, stats)
        result = insertedStats
        console.log({ insertedStats })
      }
      return NextResponse.json(
        { result },
        {
          status: 200,
        }
      )
    } else {
      return NextResponse.json(
        { result: null },
        {
          status: 403,
        }
      )
    }
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 })
  }
}
