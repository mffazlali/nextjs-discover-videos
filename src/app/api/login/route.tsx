import { getUserById } from '@/app/_lib/hasura'
import { magicAdmin } from '@/app/_lib/magic'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { setTokenCookie } from '@/app/_lib/cookies'

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: 'login' }, { status: 200 })
}

export async function POST(req: NextRequest) {
  try {
    const auth = req.headers.get('Authorization')
    const didToken = auth?.substring(7) ?? ''
    console.log({ didToken })
    const metaData = await magicAdmin.users.getMetadataByToken(didToken)
    console.log({ metaData })
    const jwtToken=jwt.sign({
      ...metaData,
      "iat": Math.floor(Date.now() / 1000),
      "exp": Math.floor(Date.now() / 1000 * 7 * 24 * 60 * 60),
      "https://hasura.io/jwt/claims": {
        "x-hasura-default-role": "user",
        "x-hasura-allowed-roles": ["user", "admin"],
        "x-hasura-user-id": metaData.issuer,
      }
    }, process.env.NEXT_PUBLIC_HUSARA_JWT!)
    console.log({ jwtToken })
    const userCurrent= await getUserById(jwtToken,metaData.email!)
    console.log({ userCurrent })
    const cookie=setTokenCookie(jwtToken)
    console.log({ cookie })
    return NextResponse.json(
      { result: null },
      {
        status: 200,
        headers: {
          'Set-Cookie': cookie,
        },
      }
    )
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 })
  }
}
