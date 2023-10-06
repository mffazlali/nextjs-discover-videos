import jwt, { JwtPayload } from 'jsonwebtoken'

export const verifyToken = (token: string) => {
  try {
    const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_HUSARA_JWT!)
    return (decodedToken as JwtPayload)  
  } catch (error) {
    return null
  }
}
