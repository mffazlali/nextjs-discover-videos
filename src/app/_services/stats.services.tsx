import { json } from 'stream/consumers'

export const getStatsService = async (videoId: string) => {
  const response = await fetch(`/api/stats?videoId=${videoId}`, {
    method: 'get',
    headers: {
      'content-type': 'application/json',
    },
  })
  return response.json()
}

export const setStatsService = async (stats: any) => {
  const response = await fetch('/api/stats', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(stats),
  })
  return response.json()
}
