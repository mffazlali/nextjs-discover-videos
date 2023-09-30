import { getUserById, insertUser } from '@/app/_lib/hasura'
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
    const publicAddress = await magicAdmin.token.getPublicAddress(didToken)
    const issuer = await magicAdmin.token.getIssuer(didToken)
    // const email = await magicAdmin.users.getMetadataByIssuer(issuer)
    const email = 'mf.fazlali@gmail.com'
    console.log(email)
    const metaData = {
      publicAddress,
      issuer,
      email,
    }
    console.log({ metaData })
    const decoded = jwt.sign(
      {
        ...metaData,
        iat: Math.floor(Date.now() / 1000 - 1 * 24 * 60 * 60),
        exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
        'https://hasura.io/jwt/claims': {
          'x-hasura-default-role': 'user',
          'x-hasura-allowed-roles': ['user', 'admin'],
          'x-hasura-user-id': `${metaData.issuer}`,
        },
      },
      process.env.NEXT_PUBLIC_HUSARA_JWT!
    )
    const jwtToken = `Bearer ${decoded}`
    console.log(jwtToken)
    const findedUsers = await getUserById(jwtToken, metaData.issuer)
    const users = [...findedUsers.data.users]
    const cookie = setTokenCookie(decoded)
    console.log({ users })
    if (users.length > 0) {
      return NextResponse.json(
        { result: { message: 'user existed' } },
        {
          status: 200,
          headers: {
            'Set-Cookie': cookie,
          },
        }
      )
    } else {
      const insertedUsers = await insertUser(jwtToken, metaData)
      console.log(insertedUsers)
      return NextResponse.json(
        { result: { message: 'user is inserted' } },
        {
          status: 200,
          headers: {
            'Set-Cookie': cookie,
          },
        }
      )
    }
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 })
  }
}
