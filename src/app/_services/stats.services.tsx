import { json } from 'stream/consumers'

export const getStatsService = (token: string, videoId: string) => {
  fetch('/api/stats', {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ videoId }),
  })
}

export const setStatsService = (token: string, stats: any) => {
  fetch('/api/stats', {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ stats }),
  })
}
