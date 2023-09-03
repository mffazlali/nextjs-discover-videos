import videoTestData from '../store/videos.json'

export const getVideos = async (
  search: string,
  options: {
    cache?: RequestCache | undefined
    revalidate?: number | undefined
  },
  maxResults = 25
) => {
  const url = `search?part=snippet&maxResults=${maxResults}&q=${search}`
  const init: RequestInit = {
    cache: options.cache,
    next: { revalidate: options.revalidate },
  }
  return getCommonVideos(url, init)
}

export const getPopularVideos = async (
  options: { cache?: RequestCache; revalidate?: number },
  maxResults = 25
) => {
  const url = `videos?&maxResults=${maxResults}&part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&locale=us`
  const init: RequestInit = {
    cache: options.cache,
    next: { revalidate: options.revalidate },
  }
  return getCommonVideos(url, init)
}

export const getYoutubeVideoById = async (
  id: string,
  options: { cache?: RequestCache; revalidate?: number }
) => {
  const url = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}`
  const init: RequestInit = {
    cache: options.cache,
    next: { revalidate: options.revalidate },
  }
  return getCommonVideos(url, init)
}

const getCommonVideos = async (url: string, init?: RequestInit) => {
  const baseUrl = `https://youtube.googleapis.com/youtube/v3`
  const youtubeAPIKey = process.env.YOUTUBE_API_KEY
  const isDev = process.env.DEVELOPMENT
  const input = `${baseUrl}/${url}&key=${youtubeAPIKey}`
  let response: any = null
  if (isDev) {
    const queryParams = url.split('&')
    const queryParamsId = queryParams[queryParams.length - 1]
    const id = queryParamsId.split('=')[1]
    response = {
      result: videosMapper(videoTestData.items).filter(
        (video) => video.id == id
      ),
    }
  } else {
    response = await fetch(input, init)
      .then(async (res) => {
        const jsonRes = await res.json()
        const result = videosMapper([...jsonRes.items])
        return Promise.resolve({ result, message: 'success Done' })
      })
      .catch((err: Error) =>
        Promise.resolve({ result: [], message: err.message })
      )
    console.log({ response })
  }
  return response.result
}

const videosMapper = (videos: any[]) => {
  const result = videos.map((video) => {
    const snippet = video.snippet
    return {
      id: video.id.videoId,
      imgUrl: snippet.thumbnails.high.url,
      title: snippet.title,
      publishTime: snippet.publishedAt,
      description: snippet.description,
      channelTitle: snippet.channelTitle,
      viewCount: video.statistics ? video.statistics.viewCount : 0,
    }
  })
  return result
}
