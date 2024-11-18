import { fetchYoutubePlaylist } from '@/actions/youtube.action';
import Ui from '@/app/ranking/ui';
import RankingSkeleton from '@/components/skeleton/rankingSkeleton';
import { SortType } from '@/mocks/types_db';
import { Suspense } from 'react';

export default async function page({ searchParams }) {
  const currentTag = (searchParams.q || 'views') as SortType;
  const initialVideos = await fetchYoutubePlaylist(currentTag);

  return (
    <Suspense fallback={<RankingSkeleton />}>
      <Ui initialVideos={initialVideos} currentTag={currentTag} />
    </Suspense>
  );
}
