import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

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
