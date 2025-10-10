'use server';

import { LoadMoreOptions, VideoOptions } from '@/types/youtube';
import { createServerSupabaseClient } from '@/lib/utils/supabase/server';

const EXCLUDED_CHANNEL_IDS = ['UC6YnTqZidFg4WUiXpiCtSSQ'];
const EXCLUDED_CHANNEL_KEYWORDS = ['아이리 칸나', 'airi kanna'];

export async function getVideos({
  playlistType = 'all',
  sortBy = 'views',
  rankType = 'total',
  limit = 30,
  offset = 0,
  searchQuery = '',
}: VideoOptions = {}) {
  const supabase = await createServerSupabaseClient();
  try {
    // 랭킹 조회 (일간/주간)
    if (['daily', 'weekly'].includes(rankType)) {
      const functionName = rankType === 'daily' ? 'get_daily_rankings' : 'get_weekly_rankings';
      const { data, error } = await supabase.rpc(functionName, {
        p_playlist_type: playlistType === 'all' ? null : playlistType,
      });
      if (error) throw error;

      const filteredData = (data ?? []).filter((video) => !shouldExcludeVideo(video));

      // 페이지네이션 적용
      const paginatedData = filteredData.slice(offset, offset + limit);
      return {
        videos: paginatedData,
        totalCount: filteredData.length,
        hasMore: offset + limit < filteredData.length,
      };
    }

    // 전체 순위 조회
    let query = supabase.from('youtube_videos').select('*', { count: 'exact' });
    if (searchQuery.trim()) {
      query = query.or(`title.ilike.%${searchQuery}%,` + `video_owner_channel_title.ilike.%${searchQuery}%`);
    }
    if (playlistType !== 'all') {
      query = query.eq('playlist_type', playlistType);
    }

    if (EXCLUDED_CHANNEL_IDS.length) {
      const inClause = `(${EXCLUDED_CHANNEL_IDS.map((channelId) => `"${channelId}"`).join(',')})`;
      query = query.not('channel_id', 'in', inClause);
    }

    EXCLUDED_CHANNEL_KEYWORDS.forEach((keyword) => {
      const pattern = `%${keyword}%`;
      query = query.not('channel_title', 'ilike', pattern);
      query = query.not('video_owner_channel_title', 'ilike', pattern);
    });

    const orderMap = {
      views: 'view_count',
      likes: 'like_count',
      date: 'published_at',
    };
    // 필터에 따라 정렬
    query = query.order(orderMap[sortBy], { ascending: false });

    const { data, error, count } = await query.range(offset, offset + limit - 1);

    if (error) throw error;

    const filteredData = (data ?? []).filter((video) => !shouldExcludeVideo(video));
    const removedCount = (data?.length ?? 0) - filteredData.length;
    const totalCount =
      count != null ? Math.max(0, count - removedCount) : filteredData.length;
    return {
      videos: filteredData,
      totalCount,
      hasMore: totalCount ? offset + limit < totalCount : filteredData.length === limit,
    };
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
}

export async function loadMoreVideos(options: LoadMoreOptions) {
  try {
    const offset = (options.page - 1) * (options.limit ?? 30);
    const result = await getVideos({ ...options, offset });
    return {
      ...result,
      nextPage: result.hasMore ? options.page + 1 : null,
    };
  } catch (error) {
    console.error('Error in loadMoreVideos:', error);
    throw new Error('Failed to load more videos');
  }
}

function shouldExcludeVideo<T extends { channel_id?: string | null; channel_title?: string | null; video_owner_channel_title?: string | null }>(
  video: T,
) {
  const matchesId = video.channel_id ? EXCLUDED_CHANNEL_IDS.includes(video.channel_id) : false;
  const titles = [video.channel_title, video.video_owner_channel_title]
    .filter(Boolean)
    .map((title) => (title as string).toLowerCase());
  const matchesKeyword = titles.some((title) =>
    EXCLUDED_CHANNEL_KEYWORDS.some((keyword) => title.includes(keyword.toLowerCase())),
  );
  return matchesId || matchesKeyword;
}
