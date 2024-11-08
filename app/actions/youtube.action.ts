// app/actions/youtube.action.ts
export async function fetchYoutubePlaylist() {
  const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const PLAYLIST_ID = process.env.NEXT_PUBLIC_PLAYLIST_ID;

  try {
    const playlistResponse = await fetch(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${YOUTUBE_API_KEY}`,
      {
        next: { revalidate: 3600 }, // 1시간마다 재검증
      }
    );

    if (!playlistResponse.ok) {
      throw new Error('Failed to fetch playlist');
    }

    const playlistData = await playlistResponse.json();
    const videoIds = playlistData.items.map((item) => item.snippet.resourceId.videoId).join(',');

    const videoResponse = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!videoResponse.ok) {
      throw new Error('Failed to fetch video details');
    }

    const videoData = await videoResponse.json();

    return videoData.items
      .map((video) => ({
        id: video.id,
        viewCount: parseInt(video.statistics.viewCount, 10),
        likeCount: parseInt(video.statistics.likeCount, 10) || 0,
        snippet: playlistData.items.find((item) => item.snippet.resourceId.videoId === video.id).snippet,
      }))
      .sort((a, b) => b.viewCount - a.viewCount);
  } catch (error) {
    console.error('Error fetching playlist:', error);
    throw error;
  }
}
