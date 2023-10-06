import videoTestData from '../store/videos.json'
import { getStatsByFavourited, getStatsByWatched } from './hasura'

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
  const youtubeAPIKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
  const isDev = process.env.NEXT_PUBLIC_DEVELOPMENT
  const input = `${baseUrl}/${url}&key=${youtubeAPIKey}`
  let response: any = null
  if (!!isDev) {
    if (url.includes('&id=')) {
      const id = url.substring(url.indexOf('&id=') + 4)
      response = {
        result: videosMapper(videoTestData.items).filter(
          (video) => video.id == id
        ),
      }
    } else {
      response = { result: videosMapper(videoTestData.items) }
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
  }
  return response.result
}

export const getWatchItAgainVideos = async (token: string, userId: string) => {
  const jwtToken = `Bearer ${token}`
  const result = await getStatsByWatched(jwtToken, userId)
  const videos = [...result.data.stats]
  return videos.map((video) => {
    return {
      id: video.videoId,
      imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
    }
  })
}

export const getFavouritedVideos = async (token: string, userId: string) => {
  const jwtToken = `Bearer ${token}`
  const result = await getStatsByFavourited(jwtToken, userId)
  const videos = [...result.data.stats]
  return videos.map((video) => {
    return {
      id: video.videoId,
      imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
    }
  })
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
