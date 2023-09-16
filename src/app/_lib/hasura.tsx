/*
This is an example snippet - you should consider tailoring it
to your service.
*/

async function queryHusaraGQL(
  operationsDoc: string,
  operationName: string,
  variables: any
) {
  const result = await fetch(process.env.NEXT_PUBLIC_HUSARA_ADIMN_URL!, {
    method: 'POST',
    headers: {
      // 'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HUSARA_ADIMN_SECRET!,
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZmF6bGFsaSIsImlhdCI6MTY5NDg4NDIxNCwiZXhwIjoxNjk1NDg5MDY3LCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdLCJ4LWhhc3VyYS11c2VyLWlkIjoicmV6YWllIn19.nqANpFQ5ek0RmE_UfraxbFOstnuXdHzUS_LzTmFVSi4',
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  })

  return await result.json()
}

function fetchMyQuery() {
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
  return queryHusaraGQL(operationsDoc, 'MyQuery', {})
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