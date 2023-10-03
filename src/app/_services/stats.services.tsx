import { json } from 'stream/consumers'

export const getStatsService = (videoId: string) => {
  fetch(`/api/stats?videoId=${videoId}`, {
    method: 'get',
    headers: {
      'content-type': 'application/json',
    },
  })
}

export const setStatsService = (stats: any) => {
  fetch('/api/stats', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ stats }),
  })
}
