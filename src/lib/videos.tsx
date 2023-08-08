import videoData from '../store/videos.json'
export const getVideos = async(search:string) => {
  const youtubeAPIKey = process.env.YOUTUBE_API_KEY
  const input=`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${search}&key=${youtubeAPIKey}`
  const response=await fetch(input)
  const jsonResponse=await response.json()
  console.log({jsonResponse})

  const videos = [...jsonResponse.items].map((video) => {
    return {
      id: video.id.videoId,
      imgUrl: video.snippet.thumbnails.high.url,
      name: video.snippet.title,
    }
  })
  return videos
}
