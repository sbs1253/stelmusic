import Ui from '@/app/ranking/ui';
import { FILTER_OPTIONS, VideoFilters } from '@/types/youtube';
import { Suspense } from 'react';
import RankingSkeleton from '@/app/ranking/components/videoRankingSection/rankingSkeleton';
import { getVideos } from '@/actions/youtube/video.action.ts';
export default async function page({ searchParams }) {
  const initialFilters: VideoFilters = {
    sort: (searchParams.sort as VideoFilters['sort']) || FILTER_OPTIONS.SORT.VIEWS,
    rankType: (searchParams.rankType as VideoFilters['rankType']) || FILTER_OPTIONS.RANK_TYPE.TOTAL,
    playlistType: (searchParams.playlistType as VideoFilters['playlistType']) || FILTER_OPTIONS.PLAYLIST_TYPE.ALL,
  };

  const initialData = await getVideos({
    sortBy: initialFilters.sort,
    rankType: initialFilters.rankType,
    playlistType: initialFilters.playlistType,
    limit: 50,
    offset: 0,
  });

  return (
    <Suspense fallback={<RankingSkeleton />}>
      <Ui initialData={initialData} initialFilters={initialFilters} />
    </Suspense>
  );
}
