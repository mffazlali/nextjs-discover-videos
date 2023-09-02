import videoData from '../store/videos.json'

export const getVideos = async (
  search: string,
  options: { cache?: RequestCache | undefined; revalidate?: number | undefined },
  maxResults=25,
) => {
  const url = `search?part=snippet&maxResults=${maxResults}&q=${search}`
  const init: RequestInit = {
    cache: options.cache,
    next: { revalidate: options.revalidate },
  }
  return getCommonVideos(url,init)
}

export const getPopularVideos = async (options: { cache: RequestCache; revalidate: number },maxResults=25,) => {
  const url = `videos?&maxResults=${maxResults}&part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&locale=us`
  const init: RequestInit = {
    cache: options.cache,
    next: { revalidate: options.revalidate, },
  }
  return getCommonVideos(url)
}

const getCommonVideos = async (url: string, init?: RequestInit) => {
  const baseUrl = `https://youtube.googleapis.com/youtube/v3`
  const youtubeAPIKey = process.env.YOUTUBE_API_KEY
  const input = `${baseUrl}/${url}&key=${youtubeAPIKey}`
  const response = await fetch(input, init)
    .then(async (res) => {
      const jsonRes = await res.json()
      const result = [...jsonRes.items].map((video) => {
        return {
          id: video.id.videoId,
          imgUrl: video.snippet.thumbnails.high.url,
          title: video.snippet.title,
        }
      })
      return Promise.resolve({ result, message: 'success Done' })
    })
    .catch((err: Error) =>
      Promise.resolve({ result: [], message: err.message })
    )
  console.log({ response })
  return response.result
}
