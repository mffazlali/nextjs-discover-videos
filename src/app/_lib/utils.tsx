import jwt, { JwtPayload } from 'jsonwebtoken'

export const verifyToken = (token: string) => {
  try {
    console.log({token})
    console.log({aaa:process.env.NEXT_PUBLIC_HUSARA_JWT})
    const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_HUSARA_JWT!)
    console.log({decodedToken})
    return (decodedToken as JwtPayload)  
  } catch (error) {
    console.log({error})
    return null
  }
}
