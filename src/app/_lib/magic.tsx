import { Magic } from 'magic-sdk'

const createMagic = () => {
  // pk_live_646746B6BC3A7FF1
  const publicKey = process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY!
  return typeof window !== 'undefined' ? new Magic(publicKey) : null
}

export const magic = createMagic()
