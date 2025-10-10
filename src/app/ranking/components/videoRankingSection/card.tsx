import { VideoLink } from '@/components/layout/videoLink';
import { formatDate, formatLikeCount, formatViewCount } from '@/lib/utils/formatters';
import Image from 'next/image';
import { CheckCircle } from '@mui/icons-material';

const rankStyles = {
  top3: 'text-xl font-bold text-brand-primary',
  normal: 'text-lg font-medium text-brand-secondary',
};

// 통계 데이터 계산 함수
const countMapping = {
  daily: (video) => ({
    viewCount: video.view_increase,
    likeCount: video.like_increase,
    label: '일간',
  }),
  weekly: (video) => ({
    viewCount: video.weekly_view_increase,
    likeCount: video.weekly_like_increase,
    label: '주간',
  }),
  total: (video) => ({
    viewCount: video.view_count,
    likeCount: video.like_count,
    label: '전체',
  }),
};

function getCountsByFilter(video, type = 'total') {
  const counts = countMapping[type](video);
  return {
    ...counts,
    publishedAt: video.published_at.split('T')[0],
  };
}

export default function Card({ video, index, filters, toggleMusic, selectedMusic }) {
  const { viewCount, likeCount, publishedAt, label } = getCountsByFilter(video, filters.rankType);
  const isSelected = selectedMusic.has(video.video_id);

  const sortDisplay = {
    views: `${label} 조회수 ${formatViewCount(viewCount)}`,
    likes: `${label} 좋아요 ${formatLikeCount(likeCount)}`,
    date: formatDate(publishedAt),
  };

  return (
    <div
      className={`relative flex items-center gap-4 p-3 rounded-lg transition-all duration-200 cursor-pointer
        ${isSelected ? 'bg-brand-background hover:bg-brand-background/80' : 'hover:bg-gray-50'}`}
      onClick={() => toggleMusic(video.video_id)}
    >
      {/* 순위 표시 */}
      <div className={`flex-shrink-0 w-8 text-center ${index < 3 ? rankStyles.top3 : rankStyles.normal}`}>
        {index + 1}
      </div>

      {/* 썸네일 영역 */}
      <div className="relative flex-shrink-0">
        <Image
          src={video.thumbnail_url}
          alt={video.title}
          width={80}
          height={80}
          className="h-20 w-20 rounded-md object-cover bg-gray-100"
        />
        {isSelected && (
          <div className="absolute -top-2 -right-2 bg-white rounded-full">
            <CheckCircle className="w-5 h-5 text-brand-primary" />
          </div>
        )}
      </div>

      {/* 컨텐츠 영역 */}
      <div className="flex-1 min-w-0">
        <VideoLink
          videoId={video.video_id}
          className={`text-sm font-medium line-clamp-2 leading-snug
            ${isSelected ? 'text-brand-primary' : 'text-gray-900'}
            hover:text-brand-primary transition-colors`}
        >
          {video.title}
        </VideoLink>

        <div className="mt-1 flex items-center gap-2">
          <p className="text-xs text-brand-text truncate">{video.video_owner_channel_title}</p>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="text-xs text-brand-text">{sortDisplay[filters.sort]}</span>
        </div>
      </div>
    </div>
  );
}
