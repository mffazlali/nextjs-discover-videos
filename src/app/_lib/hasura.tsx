/*
This is an example snippet - you should consider tailoring it
to your service.
*/

async function fetchGraphQL(
  operationsDoc: string,
  operationName: string,
  variables: any
) {
  const result = await fetch('https://optimal-drum-65.hasura.app/v1/graphql', {
    method: 'POST',
    headers: {
      'x-hasura-admin-secret': 'iX24GlcsLpslFbKpKcJlSqc0sbgYOj5m4SCqcbHJ2d42Et6ypQDHaIs8HaiUNaT0',
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  })

  return await result.json()
}

const operationsDoc = `
    query MyQuery {
      users {
        issuer
        publicAddress
        email
        id
      }
    }
  `

function fetchMyQuery() {
  return fetchGraphQL(operationsDoc, 'MyQuery', {})
}

export async function startFetchMyQuery() {
  const { errors, data } = await fetchMyQuery()

  if (errors) {
    // handle those errors like a pro
    console.error(errors)
  }

  // do something great with this precious data
  console.log(data)
}