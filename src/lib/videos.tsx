import videoData from '../store/videos.json'
export const getVideos = () => {
  const videos = [...videoData.items].map((video) => {
    return {
      id: video.id.videoId,
      imgUrl: video.snippet.thumbnails.high.url,
      name: video.snippet.title,
    }
  })
  return videos
}
