import { NextRequest, NextResponse } from 'next/server'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { getStatsByVideoId, insertStats, updateStats } from '@/app/_lib/hasura'

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies!.get('token')!.value
    const decodedToken = jwt.verify(
      token,
      process.env.NEXT_PUBLIC_HASURA_ADIMN_SECRET!
    )
    if (decodedToken) {
      const jwtToken = `Bearer ${decodedToken}`
      const userId = await (decodedToken as JwtPayload).issuer
      let { videoId } = await req.json()
      const findedStats = await getStatsByVideoId(jwtToken, userId, videoId)
      const doesStatsExist = [...findedStats.data.stats].length > 0
      if (doesStatsExist) {
        return NextResponse.json(
          { result: findedStats.data.stats },
          {
            status: 200,
          }
        )
      } else {
        return NextResponse.json(
          { result: [] },
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
    const token = req.cookies!.get('token')!.value
    const decodedToken = jwt.verify(
      token,
      process.env.NEXT_PUBLIC_HASURA_ADIMN_SECRET!
    )
    if (decodedToken) {
      const jwtToken = `Bearer ${decodedToken}`
      const userId = await (decodedToken as JwtPayload).issuer
      let { videoId, favourited, watched = false } = await req.json()
      const findedStats = await getStatsByVideoId(jwtToken, userId, videoId)
      const doesStatsExist = [...findedStats.data.stats].length > 0
      const stats = {
        userId,
        videoId,
        favourited,
        watched,
      }
      if (doesStatsExist) {
        const updateedStats = await updateStats(jwtToken, stats)
        console.log({ updateedStats })
      } else {
        const insertedStats = await insertStats(jwtToken, stats)
        console.log({ insertedStats })
      }
      return NextResponse.json(
        { result: null },
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
