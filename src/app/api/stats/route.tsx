import { NextRequest, NextResponse } from 'next/server'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { getStatsByVideoId, insertStats, updateStats } from '@/app/_lib/hasura'
import { verifyToken } from '@/app/_lib/utils'

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies!.get('token')!.value
    const decodedToken = await verifyToken(token)
    if (decodedToken) {
      const jwtToken = `Bearer ${token}`
      const userId = decodedToken.issuer
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
            status: 404,
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
    const token = req.cookies!.get('token')!.value
    const decodedToken=await verifyToken(token)
    if (decodedToken) {
      const jwtToken = `Bearer ${token}`
      const userId = decodedToken.issuer
      const res = await req.json()
      let { videoId, favourited, watched = false } = res
      const findedStats = await getStatsByVideoId(jwtToken, userId, videoId)
      const stats = {
        userId,
        videoId,
        favourited,
        watched,
      }
      const doesStatsExist = [...findedStats.data.stats].length > 0
      let result = null
      if (doesStatsExist) {
        const updateedStats = await updateStats(jwtToken, stats)
        result = updateedStats
      } else {
        const insertedStats = await insertStats(jwtToken, stats)
        result = insertedStats
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
