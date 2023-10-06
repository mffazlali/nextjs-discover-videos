export async function getUserById(token: string, issuer: any) {
  const operationsDoc = 
  ` query MyQuery($issuer: String = "") {
    users(where: {issuer: {_eq: $issuer}}) {
      email
      issuer
      publicAddress
    }
  }
`;
  const headers = {
    // 'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_ADIMN_SECRET!,
    'content-type': 'application/json',
    Authorization: token

  }
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADIMN_URL!, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: operationsDoc,
      variables:{'issuer':issuer},
      operationName: 'MyQuery',
    }),
    mode:'cors'
  })

  return await result.json()
}

export async function insertUser(token: string, user: any) {
  const { issuer, email, publicAddress } = user
  const operationsDoc = `
  mutation InsertUser($email: String = "", $issuer: String = "", $publicAddress: String = "") {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      affected_rows
    }
  }
`;
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADIMN_URL!, {
    method: 'POST',
    headers: {
      // 'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_ADIMN_SECRET!,
      'content-type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: user,
      operationName: 'InsertUser',
    }),
  })

  return await result.json()
}

export async function getStatsByVideoId(token: string, userId: string,videoId:string) {
  const operationsDoc = `
  query getStatsByVideoId($userId: String = "", $videoId: String = "") {
    stats(where: {userId: {_eq: $userId}, _and: {videoId: {_eq: $videoId}}}) {
      userId
      videoId
      favourited
      watched
    }
  }
`;
  const headers = {
    // 'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_ADIMN_SECRET!,
    'content-type': 'application/json',
    Authorization: token

  }
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADIMN_URL!, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: operationsDoc,
      variables:{userId,videoId},
      operationName: 'getStatsByVideoId',
    }),
    mode:'cors'
  })

  return await result.json()
}

export async function getStatsByWatched(token: string, userId: string) {
  const operationsDoc = `
  query getStatsByWatched($userId: String = "") {
    stats(where: {userId: {_eq: $userId}, _and: {watched: {_eq: true}}}) {
      userId
      videoId
      watched
    }
  }
`;
  const headers = {
    // 'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_ADIMN_SECRET!,
    'content-type': 'application/json',
    Authorization: token

  }
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADIMN_URL!, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: operationsDoc,
      variables:{userId},
      operationName: 'getStatsByWatched',
    }),
    mode:'cors'
  })

  return await result.json()
}

export async function getStatsByFavourited(token: string, userId: string) {
  const operationsDoc = `
  query getStatsByFavourited($userId: String = "") {
    stats(where: {userId: {_eq: $userId}, _and: {favourited: {_eq: 1}}}) {
      userId
      videoId
      favourited
    }
  }
`;
  const headers = {
    // 'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_ADIMN_SECRET!,
    'content-type': 'application/json',
    Authorization: token

  }
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADIMN_URL!, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: operationsDoc,
      variables:{userId},
      operationName: 'getStatsByFavourited',
    }),
    mode:'cors'
  })

  return await result.json()
}

export async function insertStats(token: string, stats: any) {
  const operationsDoc = `
  mutation InsertStats($userId: String = "did:ethr:0x954307326bCB0f3F5234070965E4F8279f87F321", $videoId: String = "1234", $favourited: Int = 1, $watched: Boolean = true) {
    insert_stats_one(object: {userId: $userId, videoId: $videoId, favourited: $favourited, watched: $watched}) {
      userId
      videoId
      favourited
      watched
    }
  }
`;
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADIMN_URL!, {
    method: 'POST',
    headers: {
      // 'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_ADIMN_SECRET!,
      'content-type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: stats,
      operationName: 'InsertStats',
    }),
  })

  return await result.json()
}

export async function updateStats(token: string, stats: any) {
  const operationsDoc = `
  mutation UpdateStats($favourited: Int = null, $watched: Boolean = true, $userId: String = "", $videoId: String = "") {
    update_stats(where: {userId: {_eq: $userId}, _and: {videoId: {_eq: $videoId}}}, _set: {favourited: $favourited, watched: $watched}) {
      affected_rows
    }
  }
`;  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADIMN_URL!, {
    method: 'POST',
    headers: {
      // 'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_ADIMN_SECRET!,
      'content-type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: stats,
      operationName: 'UpdateStats',
    }),
  })

  return await result.json()
}



