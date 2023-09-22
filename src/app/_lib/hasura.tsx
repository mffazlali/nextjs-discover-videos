export async function getUserById(token: string, email: string) {
  const operationsDoc = `
  query getUserByEmail($email: String = "") {
    users(where: {email: {_eq: $email}}) {
      email
      issuer
      publicAddress
    }
  }
`
  const result = await fetch(process.env.NEXT_PUBLIC_HUSARA_ADIMN_URL!, {
    method: 'POST',
    headers: {
      // 'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HUSARA_ADIMN_SECRET!,
      Authorization: token,
    },
    body: JSON.stringify({
      query: operationsDoc,
      email: email,
      operationName: 'getUserByEmail',
    }),
  })

  return await result.json()
}

export async function insertUser(token: string, user: any) {
  const {issuer,email,publicAddress}=user
  const operationsDoc = `
  mutation insertUser($email: String = "", $issuer: String = "", $publicAddress: String = "") {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress})
  }
`
  const result = await fetch(process.env.NEXT_PUBLIC_HUSARA_ADIMN_URL!, {
    method: 'POST',
    headers: {
      // 'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HUSARA_ADIMN_SECRET!,
      Authorization: token,
    },
    body: JSON.stringify({
      query: operationsDoc,
      user,
      operationName: 'insertUser',
    }),
  })

  return await result.json()
}
