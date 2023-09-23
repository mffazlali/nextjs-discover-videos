import { Magic } from '@magic-sdk/admin'

// export const magicAdmin = await Magic.init(process.env.MAGIC_SECRET_API_KEY,{
//     endpoint:'https://api.magic.link'
// })

export const magicAdmin = new Magic(process.env.MAGIC_SECRET_API_KEY, {
    endpoint: 'https://api.magic.link',
  })
