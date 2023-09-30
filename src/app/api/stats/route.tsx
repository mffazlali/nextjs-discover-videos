import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { getStatsByVideoId, insertStats, updateStats } from '@/app/_lib/hasura'
import { magicAdmin } from '@/app/_lib/magic'

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: 'login' }, { status: 200 })
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies!.get('token')!.value
    const decoded = jwt.verify(
      token,
      process.env.NEXT_PUBLIC_HASURA_ADIMN_SECRET!
    )
    if (decoded) {
      const jwtToken = `Bearer ${decoded}`
      const userId = await magicAdmin.token.getIssuer(jwtToken)
      const videoId = req.nextUrl.searchParams.get('videoId')!
      const findedStats = await getStatsByVideoId(jwtToken, userId, videoId)
      const favourited = 1
      const watched = true
      const doesStatsExist = [...findedStats.data.stats].length > 0
      const stats = {
        userId,
        videoId,
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
