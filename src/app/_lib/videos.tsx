import videoData from '../store/videos.json'

export const getVideos = async (search: string) => {
  const url = `search?part=snippet&q=${search}`
  return getCommonVideos(url)
}

export const getPopularVideos = async () => {
  const url = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&locale=us`
  return getCommonVideos(url)
}

const getCommonVideos = async (url: string) => {
  const baseUrl = `https://youtube.googleapis.com/youtube/v3`
  const youtubeAPIKey = process.env.YOUTUBE_API_KEY
  const input = `${baseUrl}/${url}&maxResults=25&key=${youtubeAPIKey}`
  const response = await fetch(input, { cache: 'no-cache' })
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
    .catch((err: Error) => Promise.resolve({ result: [], message: err.message }))
  console.log({ response })
  return response.result
}
