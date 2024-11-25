'use server';

import { SortType, YoutubeVideo } from '@/mocks/types_db';
import { createServerSupabaseClient } from '@/utils/supabase/server';

interface VideoData {
  video_id: string;
  title: string;
  description: string;
  channel_id: string;
  channel_title: string;
  published_at: string;
  view_count: number;
  like_count: number;
  thumbnail_url: string;
  playlist_id: string;
  position: number;
}
type PlaylistType = 'original' | 'cover';
interface PlaylistConfig {
  id: string;
  type: PlaylistType;
}
const PLAYLISTS: PlaylistConfig[] = [
  { id: 'PLLjd981H8qSN9PQ8-X6wINqBF1GjGxusy', type: 'original' },
  { id: 'PLLjd981H8qSMGC4Nir0hD2Gj9n9PDUoHX', type: 'cover' },
];

async function fetchPlaylistVideos(playlistId: string, playlistType: PlaylistType) {
  const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  let videos = [];
  let nextPageToken: string | undefined;

  try {
    do {
      // 재생목록 항목 가져오기
      const playlistResponse = await fetch(
        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}${
          nextPageToken ? `&pageToken=${nextPageToken}` : ''
        }`,
        { next: { revalidate: 3600 } }
      );

      if (!playlistResponse.ok) {
        throw new Error(`Failed to fetch playlist ${playlistId}`);
      }

      const playlistData = await playlistResponse.json();
      const videoIds = playlistData.items.map((item) => item.snippet.resourceId.videoId).join(',');

      // 비디오 상세 정보 가져오기
      const videoResponse = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`,
        { next: { revalidate: 3600 } }
      );

      if (!videoResponse.ok) {
        throw new Error(`Failed to fetch video details for playlist ${playlistId}`);
      }

      const videoData = await videoResponse.json();

      const playlistVideos = videoData.items.map((video) => {
        const playlistItem = playlistData.items.find((item) => item.snippet.resourceId.videoId === video.id);

        return {
          id: video.id,
          viewCount: parseInt(video.statistics.viewCount, 10),
          likeCount: parseInt(video.statistics.likeCount, 10) || 0,
          snippet: playlistItem.snippet,
          playlistType,
          playlistId,
        };
      });

      videos = [...videos, ...playlistVideos];
      nextPageToken = playlistData.nextPageToken;
    } while (nextPageToken);

    return videos;
  } catch (error) {
    console.error(`Error fetching playlist ${playlistId}:`, error);
    throw error;
  }
}

export async function fetchYoutubeVideos() {
  try {
    const playlistResults = await Promise.all(
      PLAYLISTS.map((playlist) => fetchPlaylistVideos(playlist.id, playlist.type))
    );
    const allVideos = playlistResults.flat();
    console.log(allVideos.length);
    const result = await saveVideoToSupabase(allVideos);
    return {
      success: true,
      data: allVideos,
      count: allVideos.length,
    };
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    throw error;
  }
}

async function saveVideoToSupabase(videos: YoutubeVideo[]) {
  const supabase = await createServerSupabaseClient();

  // YouTube 데이터를 Supabase 테이블 구조에 맞게 변환
  const mappedVideos = videos.map((video) => ({
    video_id: video.id,
    title: video.snippet.title,
    description: video.snippet.description,
    channel_id: video.snippet.channelId,
    channel_title: video.snippet.channelTitle,
    published_at: video.snippet.publishedAt,
    view_count: video.viewCount,
    like_count: video.likeCount,
    thumbnail_url: video.snippet.thumbnails.high.url,
    video_owner_channel_title: video.snippet.videoOwnerChannelTitle,
    playlist_id: video.snippet.playlistId,
    playlist_type: video.playlistType,
    position: video.snippet.position,
  }));

  const { data, error } = await supabase.from('youtube_videos').upsert(mappedVideos, {
    onConflict: 'video_id',
  });

  if (error) {
    console.error('Error saving videos:', error);
    throw error;
  }

  return { success: true, count: mappedVideos.length };
}

export async function getVideos(
  options: {
    playlistType?: 'original' | 'cover' | 'all';
    sortBy?: 'views' | 'likes' | 'date';
    limit?: number;
    offset?: number;
  } = {}
) {
  const { playlistType = 'all', sortBy = 'views', limit = 50, offset = 0 } = options;

  const supabase = await createServerSupabaseClient();

  let query = supabase.from('youtube_videos').select('*', { count: 'exact' });

  if (playlistType !== 'all') {
    query = query.eq('playlist_type', playlistType);
  }

  // 정렬
  const orderMap = {
    views: 'view_count',
    likes: 'like_count',
    date: 'published_at',
  };

  query = query.order(orderMap[sortBy], { ascending: false });

  // 페이지네이션
  const { data, error, count } = await query.range(offset, offset + limit - 1);

  if (error) throw error;

  return {
    videos: data,
    totalCount: count,
    hasMore: count ? offset + limit < count : false,
  };
}

export async function loadMoreVideos({
  sortBy = 'views',
  page,
  limit = 30,
}: {
  sortBy: SortType;
  page: number;
  limit?: number;
}) {
  const offset = (page - 1) * limit;

  const { videos, totalCount, hasMore } = await getVideos({
    sortBy,
    limit,
    offset,
  });

  return { videos, hasMore };
}